import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class WebAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Dùng default VPC — không tốn phí NAT gateway
    const vpc = ec2.Vpc.fromLookup(this, "DefaultVpc", { isDefault: true });

    // Security group: cho phép HTTP, HTTPS, SSH
    const sg = new ec2.SecurityGroup(this, "WebSG", {
      vpc,
      description: "my-job web app",
      allowAllOutbound: true,
    });
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "SSH");
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "HTTP");
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "HTTPS");

    // Key pair — private key tự động lưu vào SSM Parameter Store
    const keyPair = new ec2.KeyPair(this, "KeyPair", {
      keyPairName: "my-job-keypair",
      type: ec2.KeyPairType.RSA,
    });

    // EC2 t3.micro — đủ dùng cho SPA, ~$8/tháng
    const instance = new ec2.Instance(this, "WebServer", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: sg,
      keyPair,
      blockDevices: [
        {
          deviceName: "/dev/xvda",
          volume: ec2.BlockDeviceVolume.ebs(20), // 20GB SSD
        },
      ],
    });

    // UserData: cài nginx khi instance khởi động lần đầu
    instance.addUserData(
      "dnf install -y nginx",
      "systemctl enable nginx",
      "systemctl start nginx",
      "mkdir -p /var/www/myjob/html",
      "chown -R ec2-user:ec2-user /var/www/myjob",

      // Nginx config cho React SPA (2 domain, cùng build folder)
      "cat > /etc/nginx/conf.d/myjob.conf << 'NGINXEOF'",
      "server {",
      "    listen 80;",
      "    server_name www.buikhanhhuy.click employer.buikhanhhuy.click;",
      "    root /var/www/myjob/html;",
      "    index index.html;",
      "    location / {",
      "        try_files $uri $uri/ /index.html;",
      "    }",
      "    location /assets/ {",
      "        expires 1y;",
      "        add_header Cache-Control \"public, immutable\";",
      "    }",
      "}",
      "NGINXEOF",

      "nginx -t && systemctl reload nginx",

      // Cài certbot để setup HTTPS sau khi DNS trỏ về
      "dnf install -y python3-certbot-nginx"
    );

    // Elastic IP — IP cố định, không đổi khi restart instance
    const eip = new ec2.CfnEIP(this, "ElasticIP", {
      instanceId: instance.instanceId,
      tags: [{ key: "Name", value: "my-job-web-app" }],
    });

    // Outputs
    new cdk.CfnOutput(this, "ServerIP", {
      description:
        "Thêm A record vào Route53: www -> IP này, employer -> IP này",
      value: eip.ref,
    });

    new cdk.CfnOutput(this, "SSHCommand", {
      description: "Lệnh SSH vào server",
      value: `ssh -i my-job-keypair.pem ec2-user@${eip.ref}`,
    });

    new cdk.CfnOutput(this, "GetPrivateKey", {
      description: "Lấy private key SSH",
      value: `aws ssm get-parameter --name /ec2/keypair/${keyPair.keyPairId} --with-decryption --query Parameter.Value --output text --region ap-southeast-1 > my-job-keypair.pem && chmod 400 my-job-keypair.pem`,
    });

    new cdk.CfnOutput(this, "CertbotCommand", {
      description: "Chạy sau khi DNS A record đã trỏ về Elastic IP",
      value: `sudo certbot --nginx -d www.buikhanhhuy.click -d employer.buikhanhhuy.click --non-interactive --agree-tos -m khuy220@gmail.com`,
    });
  }
}
