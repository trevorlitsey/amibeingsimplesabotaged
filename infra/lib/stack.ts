import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as apigwv2Integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as iam from "aws-cdk-lib/aws-iam";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";
import * as path from "path";

const DOMAIN_NAME = "amibeingsimplesabotaged.com";

export class SimpleSabotageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // --- DNS & Certificate ---
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: DOMAIN_NAME,
    });

    const certificate = new acm.Certificate(this, "Certificate", {
      domainName: DOMAIN_NAME,
      subjectAlternativeNames: [`www.${DOMAIN_NAME}`],
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    // --- S3 Bucket for Frontend ---
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // --- Lambda Function ---
    const apiFunction = new nodejs.NodejsFunction(this, "ApiFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "../../api/src/handler.ts"),
      handler: "handler",
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      bundling: {
        minify: true,
        sourceMap: true,
      },
    });

    // Grant Lambda permission to invoke Claude via Bedrock (cross-region inference profile)
    apiFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["bedrock:InvokeModel"],
        resources: [
          `arn:aws:bedrock:*::foundation-model/anthropic.claude-sonnet-4-5-20250929-v1:0`,
          `arn:aws:bedrock:us-east-1:${this.account}:inference-profile/us.anthropic.claude-sonnet-4-5-20250929-v1:0`,
        ],
      })
    );

    // Required for first-time Bedrock model auto-enablement via Marketplace
    apiFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          "aws-marketplace:ViewSubscriptions",
          "aws-marketplace:Subscribe",
        ],
        resources: ["*"],
      })
    );

    // --- API Gateway ---
    const httpApi = new apigwv2.HttpApi(this, "HttpApi", {
      corsPreflight: {
        allowOrigins: [
          `https://${DOMAIN_NAME}`,
          `https://www.${DOMAIN_NAME}`,
          "http://localhost:5173",
        ],
        allowMethods: [apigwv2.CorsHttpMethod.POST, apigwv2.CorsHttpMethod.OPTIONS],
        allowHeaders: ["Content-Type"],
      },
    });

    httpApi.addRoutes({
      path: "/analyze",
      methods: [apigwv2.HttpMethod.POST],
      integration: new apigwv2Integrations.HttpLambdaIntegration(
        "LambdaIntegration",
        apiFunction
      ),
    });

    // --- CloudFront Distribution ---
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      domainNames: [DOMAIN_NAME, `www.${DOMAIN_NAME}`],
      certificate,
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy:
          cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: {
        "/analyze": {
          origin: new origins.HttpOrigin(
            `${httpApi.httpApiId}.execute-api.${this.region}.amazonaws.com`
          ),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy:
            cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        },
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    // --- Deploy Frontend to S3 ---
    // Deploy HTML files
    new s3deploy.BucketDeployment(this, "DeployHtml", {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, "../../frontend/dist"), {
          exclude: ["assets/*"],
        }),
      ],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/index.html"],
      contentType: "text/html; charset=utf-8",
    });

    // Deploy JS assets
    new s3deploy.BucketDeployment(this, "DeployJs", {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, "../../frontend/dist/assets"), {
          exclude: ["*.css"],
        }),
      ],
      destinationBucket: siteBucket,
      destinationKeyPrefix: "assets",
      prune: false,
      contentType: "text/javascript; charset=utf-8",
    });

    // Deploy CSS assets
    new s3deploy.BucketDeployment(this, "DeployCss", {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, "../../frontend/dist/assets"), {
          exclude: ["*.js"],
        }),
      ],
      destinationBucket: siteBucket,
      destinationKeyPrefix: "assets",
      prune: false,
      distribution,
      distributionPaths: ["/*"],
      contentType: "text/css; charset=utf-8",
    });

    // --- Route 53 Records ---
    new route53.ARecord(this, "ARecord", {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    });

    new route53.ARecord(this, "WwwARecord", {
      zone: hostedZone,
      recordName: "www",
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    });

    // --- Outputs ---
    new cdk.CfnOutput(this, "SiteUrl", {
      value: `https://${DOMAIN_NAME}`,
    });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: httpApi.url!,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });
  }
}
