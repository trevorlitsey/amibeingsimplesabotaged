#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SimpleSabotageStack } from "../lib/stack";

const app = new cdk.App();

new SimpleSabotageStack(app, "SimpleSabotageStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1", // Required for CloudFront + ACM
  },
});
