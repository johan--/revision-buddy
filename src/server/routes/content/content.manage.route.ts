﻿import * as express from "express";
import * as bodyParser from "body-parser";
import * as Joi from "joi";
var jwt = require('express-jwt');

import {Config as Config} from "./../../config";
import {AwsConfigManager as AwsConfigManager} from "./../../aws-config"
import {logger as logger} from "./../../utils/logger";
import {Course as Course} from "./../../model/course/courseDocumentSchema";

export class ContentController {

    public static routes(app: express.Application) {
        let router = express.Router();
        
        router.get("/toc/board/:boardname/class/:classname/subject/:subjectname", function (req, res, next) {
            let boardName = req.params.boardname;
            let className = req.params.classname;
            let subjectName = req.params.subjectname;

            Course.find("", function (err, toc) {
                if (err)
                    next(err);

                if (toc == null)
                    return res.status(500).send();

                return res.status(200).send(toc);
            });
        });

        router.get("/s3uploadrequest/sign", function (req, res, next) {

        });

        router.get("/s3readrequest/sign", function (req, res, next) {

            let fileName = req.query["filename"]; 
            const S3_BUCKET = Config.revisionContentStore_S3BucketName;
            
            let key = fileName
            let s3Params = {
                Bucket: S3_BUCKET,
                Key: key,
                Expires: (60 * 30) //30 minutes
            };

            let s3 = AwsConfigManager.initializeS3();

            s3.getSignedUrl("getObject", s3Params, function (err, data) {
                if (err) {
                    logger.info("error occured in getting signed url for GET Object");
                    next(err);
                }

                logger.info(data);
                let returnData = {
                    signed_request: data,
                    url: "https://" + S3_BUCKET + ".s3.amazonaws.com/" + key,
                    destination_filename: fileName
                };
                return res.status(200).send(returnData);
            });
        });

        return router;
    }
}