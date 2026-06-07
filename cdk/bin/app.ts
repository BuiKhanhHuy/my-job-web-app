#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WebAppStack } from "../lib/web-app-stack";

const app = new cdk.App();

new WebAppStack(app, "MyJobWebAppStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "ap-southeast-1", // Singapore — gần VN nhất
  },
  description: "my-job-web-app: EC2 + Nginx static hosting",
});
