import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as Joi from "joi"
import * as http from "request";
import * as jwt from "express-jwt";
import * as _ from "underscore";
var passwordGenerator = require('generate-password');

import {logger as logger} from "./../../utils/logger";
import {User as User} from "./../../model/user/userDocumentSchema";
import {Config as Config} from "./../../config";
import RevisionPackEventEmitter from './../../eventEmitter';
import {EnumConstants as EnumConstants} from "./../../enumConstants";

export class AccountController {

    constructor() {
    }

    public static routes(app: express.Application): any {

        let router = express.Router();

        router.post("/register", function (req, res, next) {

            logger.info("enters");

            let userName = req.body.user_name;
            User.findOne({ "user_name": userName }, function (err, result) {

                if (err)
                    next(err);

                if (!err && result) {
                    return res.send(200, "User " + userName + " already exists");
                }


                let user = new User();
                user.user_name = req.body.user_name;
                user.email = req.body.email;
                user.phone_number = req.body.phone_number;
                
                user.firstname = req.body.first_name;
                user.lastname = req.body.last_name;
                user.email_confirmed = false;
                user.phone_number_confirmed = false; 
                user.active = true;

                let bcrypt = require("bcrypt");
                let password = req.body.password;

                user.password_hash = bcrypt.hashSync(password, 10);

                logger.info("the hash is ", user.password_hash);

                user.save(function (err) {
                    if (err) {
                        next(err);
                    }
                    else {
                        return res.status(200).send(user);
                    }
                });

            });
        });

        router.post("/login", function (req, res, next) {
            passport.authenticate('local',
                function (err, user, info) {
                    if (err) {
                        next(err);
                    }

                    if (!user) {
                        return res.status(401).send("Invalid username or password");
                    }

                    let jwt = require('jsonwebtoken');
                    let token = jwt.sign({ data: user }, Config.webtokenSignatureSecretKey);
                    User.findOne({ "_id": user })
                        .then(function (userObj) {
                            var userToReturn = {
                                "lastname": userObj.lastname,
                                "firstname": userObj.firstname,
                                "user_name": userObj.user_name,
                                "revisionpack_subscriptions": userObj.revisionpack_subscriptions
                            }
                            return res.status(200).send({ 'token': token, 'user': userToReturn });
                        })
                })(req, res, next);
        });

        router.get("/user/username/:username", function (req, res, next) {
            let userName = req.params.username;

            User.findOne({ "user_name": userName }, function (err, doc) {
                if (err)
                    next(err);

                if (doc == null)
                    return res["boom"].notFound("Username not found");

                return res.status(200).send();
            });
        });

        router.get("/user/useremail/:email", function (req, res, next) {
            let userEmail = req.params.email;

            User.findOne({ "email": userEmail }, function (err, doc) {
                if (err)
                    next(err);

                if (doc == null)
                    return res["boom"].notFound("User not found");

                return res.status(200).send();
            });
        });

        router.post("/forgotpassword/username/:username", function (req, res, next) {

            let userName = req.params.username;

            User.findOne({ user_name: userName }, function (err, userDoc) {
                if (err) {
                    next(err);
                }

                if (userDoc == null) {
                    return res["boom"].notFound("Username not found");
                }

                let bcrypt = require("bcrypt");
                let randomPassword = passwordGenerator.generate({
                    length: 10,
                    numbers: false
                }); 

                logger.info(randomPassword);
                userDoc.password_hash = bcrypt.hashSync(randomPassword, 10);

                User.findByIdAndUpdate(userDoc._id, userDoc, function (err, updatedUser) {
                    if (err)
                        next(err);
                    
                    RevisionPackEventEmitter.event("passwordReset").emit(updatedUser, randomPassword);
                    return res.status(200).send(updatedUser._id);


                });
            });

        });

        router.post("/forgotpassword/useremail/:email", function (req, res, next) {

            let userEmail = req.params.email;

            User.findOne({ email: userEmail }, function (err, userDoc) {
                if (err) {
                    next(err);
                }

                if (userDoc == null) {
                    return res["boom"].notFound("User not found");
                }

                let bcrypt = require("bcrypt");
                let randomPassword = passwordGenerator.generate({
                    length: 10,
                    numbers: false
                });

                logger.info(randomPassword);
                userDoc.password_hash = bcrypt.hashSync(randomPassword, 10);

                User.findByIdAndUpdate(userDoc._id, userDoc, function (err, updatedUser) {
                    if (err)
                        next(err);

                    RevisionPackEventEmitter.event("passwordReset").emit(updatedUser, randomPassword);
                    return res.status(200).send(updatedUser._id);
                });
            });

        });

        router.post("/deactivate/apikey/:apikey", function (req, res, next) {

            let apiKey = req.params.apikey;

            if (apiKey != Config.revisionBuddy_ApiKey)
                return res["boom"].badRequest("Invalid request. Ensure to pass a proper API Key");

            if (req.body == null || req.body === "" || req.body.length == 0) {
                let error = new Error("No data received from remote source(LS)");
                next(error);
            }

            let requests = req.body.map(function (item) {

                return new Promise((resolve, reject) => {

                    let leadId = item.RelatedProspectId;

                    User.findOne({ "lead_id": leadId }, function (err, doc) {
                        if (err)
                            reject(err);

                        if (doc == null)
                            reject("User with lead_id " + leadId + " not found");

                        doc.active = false;
                        doc.revisionpack_subscriptions = null;
                        doc.status = EnumConstants.UserStatus.Deactivated;
                        doc.save(function (err) {
                            if (err)
                                reject(err);

                            else
                                resolve(doc);
                        });
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