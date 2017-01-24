import * as express from "express";
import * as bodyParser from "body-parser";
import * as Joi from "joi";
var jwt = require('express-jwt');

import {Config as Config} from "./../../config";
import {AwsConfigManager as AwsConfigManager} from "./../../aws-config"
import {logger as logger} from "./../../utils/logger";
import {Course as Course} from "./../../model/course/courseDocumentSchema";

export class CourseController {

    public static routes(app: express.Application) {
        let router = express.Router();
        
        router.get("/toc/course/:courseid", function (req, res, next) {
            let userId = req["user"]["_id"];
            let courseId = req.params.courseid;

            let query = { "course_id": courseId };
            Course.findOne(query, function (err, courseDoc) {
                if (err)
                    next(err);

                if (courseDoc == null)
                    return res["boom"].notFound("Course with specified id is not available");

                return res.status(200).send(courseDoc);
            });
        });

        router.post("/create", function (req, res, next) {

            let boardName = req.body.board;
            let className = req.body.class;
            let subjectName = req.body.subject;

            let query = { "board": boardName, "class": className, "subject": subjectName };

            Course.findOne(query, function (err, courseDoc) {
                if (err)
                    next(err);

                if (courseDoc != null)
                    return res["boom"].badRequest("Course already exists");

                let tempCourse = new Course();
                tempCourse.board = boardName;
                tempCourse.class = className;
                tempCourse.subject = subjectName;

                tempCourse.content = req.body.content;
                
                tempCourse.save(function (err, result) {
                    if (err)
                        next(err);

                    return res.status(200).send(result);
                });
            });
        });

        router.put("/content", function (req, res, next) {

            let course = req.body.course;

            let boardName = course.board;
            let className = course.class;
            let subjectName = course.subject;

            let query = { "board": boardName, "class": className, "subject": subjectName };

            Course.findOne(query, function (err, courseDoc) {
                if (err)
                    next(err);

                if (courseDoc == null)
                    return res["boom"].badRequest("Course does not exist");
                
                courseDoc.content = course.content;

                courseDoc.update(courseDoc, function (err, result) {
                    if (err)
                        next(err);

                    return res.status(200).send(result);
                });
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