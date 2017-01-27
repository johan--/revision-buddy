import * as express from "express";
import * as bodyParser from "body-parser";
import * as Joi from "joi";
import * as request from "request";

var jwt = require('express-jwt');
var url = require("url");
var _ = require("lodash");
var passwordGenerator = require('generate-password');

import {Config as Config} from "./../../config";
import {AwsConfigManager as AwsConfigManager} from "./../../aws-config"
import {logger as logger} from "./../../utils/logger";
import {RevisionPack as RevisionPack} from "./../../model/revisionPack/revisionPackDocumentSchema";
import {User as User} from "./../../model/user/userDocumentSchema";
import {UserService as UserService}  from "./../../services/userService";
import {RevisionPackService as RevisionPackService}  from "./../../services/revisionPackService";
import {LeadSquaredManager as LeadSquaredManager} from "./../../services/leadsquaredManager";
import RevisionPackEventEmitter from './../../eventEmitter';


export class RevisionPackController {

    public static routes(app: express.Application) {
        let router = express.Router();

        router.get("/toc/course/:courseid", function (req, res, next) {
            //let userId = req["user"]["_id"];
            let courseId = req.params.courseid;
            
            RevisionPack.findById(courseId, function (err, courseDoc) {
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

            RevisionPack.findOne(query, function (err, courseDoc) {
                if (err)
                    next(err);

                if (courseDoc != null)
                    return res["boom"].badRequest("Course already exists");

                let tempCourse = new RevisionPack();
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

            RevisionPack.findOne(query, function (err, courseDoc) {
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

        router.post("/salecompleted/apikey/:apikey", function (req, res, next) {

            let apiKey = req.params.apikey;

            if (apiKey != Config.revisionBuddy_ApiKey)
                return res["boom"].badRequest("Invalid request. Ensure to pass a proper API Key");

            if (req.body == null || req.body === "" || req.body.length == 0) {
                let error = new Error("No data received from remote source(LS)");
                next(error);
            }

            let requests = req.body.map(function (item) {

                return new Promise((resolve, reject) => {

                    let postData = item

                    let parentLeadId = postData.RelatedProspectId;
                    let boardName = postData.Data.mx_Custom_1;
                    let className = postData.Data.mx_Custom_2;
                    let subjectName = postData.Data.mx_Custom_3;
                    let tutorEmail = postData.Data.mx_Custom_4;

                    let userService = new UserService();
                    let revisionPackService = new RevisionPackService();
                    let lsManager = new LeadSquaredManager();

                    let promiseGetTutorDetails = userService.getUser(tutorEmail);
                    let promiseGetRevisionPackDetails = revisionPackService.getCourse(boardName, className, subjectName);
                    let promiseGetParentLeadDetails = lsManager.getLeadDetails(parentLeadId);

                    Promise.all([promiseGetTutorDetails, promiseGetRevisionPackDetails, promiseGetParentLeadDetails]).then(function (results) {

                        let tutorDetails = results[0];
                        let courseDetails = results[1];
                        let parentLeadDetails = results[2];

                        User.findOne({ "user_name": parentLeadDetails.EmailAddress }, function (err, user) {
                            if (err)
                                reject(err);

                            if (user == null) {
                                //student not found, create student
                                let bcrypt = require("bcrypt");
                                let randomPassword = passwordGenerator.generate({
                                    length: 10,
                                    numbers: false
                                }); 

                                logger.info(randomPassword);

                                let newUser = new User();
                                newUser.user_name = parentLeadDetails.EmailAddress;
                                newUser.password_hash = bcrypt.hashSync(randomPassword, 10);
                                newUser.phone_number = parentLeadDetails.Phone;
                                newUser.email = parentLeadDetails.EmailAddress;
                                newUser.lead_id = parentLeadId;
                                newUser.parent_lead_id = parentLeadId;
                                newUser.firstname = parentLeadDetails.FirstName;
                                newUser.lastname = parentLeadDetails.LastName;

                                newUser.save(function (err, savedUser) {
                                    if (err)
                                        reject(err);

                                    else if (savedUser != null) {
                                        RevisionPackEventEmitter.event("newUserCreated").emit(savedUser, tutorDetails, randomPassword);
                                        
                                        savedUser.revisionpack_subscriptions = [{ course_id: courseDetails.course_id, tutor_id: tutorDetails._id }];

                                        User.findByIdAndUpdate(savedUser._id, savedUser, function (err, updatedUser) {
                                            if (err)
                                                reject(err)

                                            if (updatedUser != null) {
                                                RevisionPackEventEmitter.event("newRevisionPackSubscribed").emit(savedUser,
                                                    tutorDetails,
                                                    { board: boardName, class: className, subject: subjectName });

                                                resolve(newUser);
                                            }
                                        });
                                    }
                                });
                            }
                            else {

                                let currentRevisionPackSubscription = _.find(user.revisionpack_subscriptions, function (o) {
                                    return (o.course_id == courseDetails.course_id && o.tutor_id == tutorDetails._id)
                                });

                                if (currentRevisionPackSubscription == null) {
                                    user.revisionpack_subscriptions.push({ course_id: courseDetails.course_id, tutor_id: tutorDetails._id });

                                    User.findByIdAndUpdate(user._id, user, function (err, result) {
                                        if (err)
                                            reject(err);

                                        if (result != null) {
                                            RevisionPackEventEmitter.event("newRevisionPackSubscribed").emit(user, tutorDetails, { board: boardName, className: className, subject: subjectName });
                                            resolve(result);
                                        }
                                    });
                                }
                                else
                                    reject(new Error("User already has subscription to the package"));

                            }
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            });

            Promise.all(requests).then(function (results) {
                logger.info(" Processed all the requests");
                res.status(200).send("Processing completed successfully");
            }).catch(function (err) {
                next(err);
            });
        });

        return router;
    }
}