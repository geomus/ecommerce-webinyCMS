import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// @ts-ignore
import { getLayerArn } from "@webiny/aws-layers";

class FileManager {
    bucket: aws.s3.Bucket;
    manageS3LambdaPermission?: aws.lambda.Permission;
    bucketNotification?: aws.s3.BucketNotification;
    role: aws.iam.Role;
    policy: aws.iam.RolePolicyAttachment;
    functions: {
        manage: aws.lambda.Function;
        transform: aws.lambda.Function;
        download: aws.lambda.Function;
    };
    constructor() {
        this.bucket = new aws.s3.Bucket("fm-bucket", {
            acl: "private",
            forceDestroy: true,
            corsRules: [
                {
                    allowedHeaders: ["*"],
                    allowedMethods: ["POST", "GET"],
                    allowedOrigins: ["*"],
                    maxAgeSeconds: 3000
                }
            ]
        });

        this.role = new aws.iam.Role("fm-lambda-role", {
            assumeRolePolicy: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "sts:AssumeRole",
                        Principal: {
                            Service: "lambda.amazonaws.com"
                        },
                        Effect: "Allow"
                    }
                ]
            }
        });

        this.policy = new aws.iam.RolePolicyAttachment("fm-lambda-role-policy", {
            role: this.role,
            policyArn: "arn:aws:iam::aws:policy/AdministratorAccess"
        });

        const transform = new aws.lambda.Function("fm-image-transformer", {
            handler: "handler.handler",
            timeout: 30,
            runtime: "nodejs10.x", // Because of the "sharp" library (built for Node10).
            memorySize: 1600,
            role: this.role.arn,
            description: "Performs image optimization, resizing, etc.",
            code: new pulumi.asset.AssetArchive({
                ".": new pulumi.asset.FileArchive("../code/fileManager/transform/build")
            }),
            layers: [getLayerArn("webiny-v4-sharp", String(process.env.AWS_REGION))],
            environment: {
                variables: { S3_BUCKET: this.bucket.id }
            }
        });

        const manage = new aws.lambda.Function("fm-manage", {
            role: this.role.arn,
            runtime: "nodejs12.x",
            handler: "handler.handler",
            timeout: 30,
            memorySize: 512,
            description: "Triggered when a file is deleted.",
            code: new pulumi.asset.AssetArchive({
                ".": new pulumi.asset.FileArchive("../code/fileManager/manage/build")
            }),
            environment: {
                variables: { S3_BUCKET: this.bucket.id }
            }
        });

        const download = new aws.lambda.Function("fm-download", {
            role: this.role.arn,
            runtime: "nodejs12.x",
            handler: "handler.handler",
            timeout: 30,
            memorySize: 512,
            description: "Serves previously uploaded files.",
            code: new pulumi.asset.AssetArchive({
                ".": new pulumi.asset.FileArchive("../code/fileManager/download//build")
            }),
            environment: {
                variables: {
                    S3_BUCKET: this.bucket.id,
                    IMAGE_TRANSFORMER_FUNCTION: transform.arn
                }
            }
        });

        this.functions = {
            transform,
            manage,
            download
        };

        this.manageS3LambdaPermission = new aws.lambda.Permission(
            "fm-manage-s3-lambda-permission",
            {
                action: "lambda:InvokeFunction",
                function: this.functions.manage.arn,
                principal: "s3.amazonaws.com",
                sourceArn: this.bucket.arn
            }
        );

        this.bucketNotification = new aws.s3.BucketNotification("bucketNotification", {
            bucket: this.bucket.id,
            lambdaFunctions: [
                {
                    lambdaFunctionArn: this.functions.manage.arn,
                    events: ["s3:ObjectRemoved:*"]
                }
            ]
        });
    }
}

export default FileManager;
