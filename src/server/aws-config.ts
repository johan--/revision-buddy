const aws = require('aws-sdk');
import {logger as logger} from "./utils/logger";
import {Config as Config} from "./config";
export class AwsConfigManager {
    
    constructor() {
    }

    public static initializeS3(): any {

        aws.config.accessKeyId = Config.aws_AccessKey;
        aws.config.secretAccessKey = Config.aws_SecretKey;
        aws.config.region = Config.aws_S3_Region;

        let s3 = new aws.S3({
            signatureVersion: 'v4'
        });
        return s3;
    }
}