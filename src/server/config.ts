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
}