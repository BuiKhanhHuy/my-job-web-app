import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

const NGINX_CONF = `
server {
    listen 80;
    server_name www.buikhanhhuy.click employer.buikhanhhuy.click;
    root /var/www/myjob/html;
    index index.html;

    # SPA routing: moi route khong tim thay file -> tra ve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache dai cho JS/CSS assets (Vite dat hash trong ten file)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
`;

export class WebAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Dung default VPC — khong ton phi NAT gateway
    const vpc = ec2.Vpc.fromLookup(this, "DefaultVpc", { isDefault: true });

    // Security group: cho phep HTTP, HTTPS, SSH
    const sg = new ec2.SecurityGroup(this, "WebSG", {
      vpc,
      description: "my-job web app",
      allowAllOutbound: true,
    });
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "SSH");
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "HTTP");
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "HTTPS");

    // Key pair — private key tu dong luu vao SSM Parameter Store
    const keyPair = new ec2.KeyPair(this, "KeyPair", {
      keyPairName: "my-job-keypair",
      type: ec2.KeyPairType.RSA,
    });

    // UserData: cai nginx khi instance khoi dong lan dau
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "dnf install -y nginx python3-certbot-nginx",
      "systemctl enable nginx",
      "systemctl start nginx",
      "mkdir -p /var/www/myjob/html",
      "chown -R ec2-user:ec2-user /var/www/myjob",
      // Ghi nginx config bang python tranh van de heredoc trong UserData
      `python3 -c "
import base64, os
conf = base64.b64decode('${Buffer.from(NGINX_CONF).toString("base64")}').decode()
with open('/etc/nginx/conf.d/myjob.conf', 'w') as f:
    f.write(conf)
"`,
      "nginx -t && systemctl reload nginx"
    );

    // EC2 t3.micro — du dung cho SPA, ~$8/thang
    const instance = new ec2.Instance(this, "WebServer", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: sg,
      keyPair,
      userData,
      blockDevices: [
        {
          deviceName: "/dev/xvda",
          volume: ec2.BlockDeviceVolume.ebs(20),
        },
      ],
    });

    // Elastic IP — IP co dinh, khong doi khi restart instance
    const eip = new ec2.CfnEIP(this, "ElasticIP", {
      instanceId: instance.instanceId,
      tags: [{ key: "Name", value: "my-job-web-app" }],
    });

    // Outputs
    new cdk.CfnOutput(this, "ServerIP", {
      description:
        "Them A record vao Route53: www -> IP nay, employer -> IP nay",
      value: eip.ref,
    });

    new cdk.CfnOutput(this, "SSHCommand", {
      description: "Lenh SSH vao server",
      value: `ssh -i my-job-keypair.pem ec2-user@${eip.ref}`,
    });

    new cdk.CfnOutput(this, "GetPrivateKey", {
      description: "Lay private key SSH",
      value: `aws ssm get-parameter --name /ec2/keypair/${keyPair.keyPairId} --with-decryption --query Parameter.Value --output text --region ap-southeast-1 > my-job-keypair.pem && chmod 400 my-job-keypair.pem`,
    });

    new cdk.CfnOutput(this, "CertbotCommand", {
      description: "Chay sau khi DNS A record da tro ve Elastic IP",
      value: `sudo certbot --nginx -d www.buikhanhhuy.click -d employer.buikhanhhuy.click --non-interactive --agree-tos -m khuy220@gmail.com`,
    });
  }
}
