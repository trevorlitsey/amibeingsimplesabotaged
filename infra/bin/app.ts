#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SimpleSabotageStack } from "../lib/stack";

const app = new cdk.App();

const certificateArn =
  app.node.tryGetContext("certificateArn") ||
  process.env.CERTIFICATE_ARN;

if (!certificateArn) {
  throw new Error(
    "certificateArn is required. Pass via `cdk deploy -c certificateArn=arn:...` or CERTIFICATE_ARN env var."
  );
}

new SimpleSabotageStack(app, "SimpleSabotageStack", {
  certificateArn,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1", // Required for CloudFront + ACM
  },
});
