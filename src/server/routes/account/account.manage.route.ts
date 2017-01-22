import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as Joi from "joi"
import * as http from "request";
import * as jwt from "express-jwt";
import * as _ from "underscore";

import {logger as logger} from "./../../utils/logger";
import {User as User} from "./../../model/user/userDocumentSchema";

export class AccountController {

    constructor() {
    }

    public static routes(app: express.Application): any {

        let router = express.Router();

        router.post("/register", function (req, res, next) {

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

        return router;
    }
}