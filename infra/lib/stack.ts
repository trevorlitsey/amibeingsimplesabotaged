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
import { Construct } from "constructs";
import * as path from "path";

const DOMAIN_NAME = "amibeingsimplesabotaged.trevorlitsey.com";

export interface SimpleSabotageStackProps extends cdk.StackProps {
  certificateArn: string;
}

export class SimpleSabotageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SimpleSabotageStackProps) {
    super(scope, id, props);

    // --- Certificate (issued out-of-band, validated via Netlify-managed DNS) ---
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "Certificate",
      props.certificateArn
    );

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

    // Grant Lambda permission to invoke Llama 3.3 70B via Bedrock (cross-region inference profile)
    apiFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["bedrock:InvokeModel"],
        resources: [
          `arn:aws:bedrock:*::foundation-model/meta.llama3-3-70b-instruct-v1:0`,
          `arn:aws:bedrock:us-east-1:${this.account}:inference-profile/us.meta.llama3-3-70b-instruct-v1:0`,
          `arn:aws:bedrock:us-east-2:${this.account}:inference-profile/us.meta.llama3-3-70b-instruct-v1:0`,
          `arn:aws:bedrock:us-west-2:${this.account}:inference-profile/us.meta.llama3-3-70b-instruct-v1:0`,
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
          "http://localhost:5173",
        ],
        allowMethods: [apigwv2.CorsHttpMethod.POST, apigwv2.CorsHttpMethod.OPTIONS],
        allowHeaders: ["Content-Type"],
      },
    });

    // Rate limiting: 5 requests/sec sustained, 10 burst
    const stage = httpApi.defaultStage!.node
      .defaultChild as apigwv2.CfnStage;
    stage.defaultRouteSettings = {
      throttlingBurstLimit: 10,
      throttlingRateLimit: 5,
    };

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
      domainNames: [DOMAIN_NAME],
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
      prune: false,
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

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
      description:
        "Add a CNAME in Netlify: amibeingsimplesabotaged -> this value",
    });
  }
}
