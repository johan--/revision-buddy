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

    public static get revisionBuddy_ApiKey(): string {
        return process.env.REVISIONBUDDY_API_KEY;
    }

    public static get identity_ApiKey(): string {
        return process.env.IDENTITY_API_KEY;
    }

    public static get tutorProfile_Ops_ApiKey(): string {
        return process.env.TUTORPROFILE_OPS_API_KEY;
    }

    public static get identityEndPoint(): string {
        return process.env.IDENTITY_ENDPOINT;
    }

    public static get tutorProfileManage_EndPoint(): string {
        return process.env.TUTOR_PROFILESTORE_ENDPOINT;
    }

    public static get lsGateway_APIEndPoint_BaseUrl(): string {
        return process.env.LS_GATEWAY_ENDPOINT_BASEURL.replace("/\/$/", "");
    }

    public static get smtp_UserName(): string {
        return process.env.SMTP_USER_NAME;
    }

    public static get smtp_Password(): string {
        return process.env.SMTP_PASSWORD;
    }

    public static get default_FromAddress(): string {
        return process.env.DEFAULT_FROM_ADDRESS;
    }
}