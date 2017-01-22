export class Config {
    public static get port(): number {
        return parseInt(process.env["API_PORT"] || process.env["PORT"] || 80);
    }

    public static get sslKeyFile(): string {
        return process.env["SSL_KEY"];
    }

    public static get sslCertFile(): string {
        return process.env["SSL_CERT"];
    }

    public static get webtokenSignatureSecretKey(): string {
        return process.env.WEBTOKEN_SECRETKEY;
    }

    public static get aws_AccessKey(): string {
        return process.env.AWS_ACCESSKEY;
    }

    public static get aws_SecretKey(): string {
        return process.env.AWS_SECRET_ACCESSKEY;
    }

    public static get aws_S3_Region(): string {
        return process.env.AWS_S3_REGION;
    }

    public static get revisionContentStore_S3BucketName(): string {
        return process.env.AWS_S3_BUCKET_NAME_REVISIONCONTENT_STORE;
    }
}