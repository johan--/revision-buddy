import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as Joi from "joi"
import * as http from "request";
import * as jwt from "express-jwt";
import * as _ from "underscore";

import {logger as logger} from "./../../utils/logger";
import {UserService as UserService}  from "./../../services/userService";

export class TutorInformationController {

    public static routes(app: express.Application): any {

        let router = express.Router();

        router.get("/details/tutorid/:id", function (req, res, next) {

            let userService = new UserService();
            userService.getUserById(req.params.id).then(function (result) {
                if (result != null)
                    return res.status(200).send({
                        user_id : result._id,
                        firstname: result.firstname,
                        phone_number: result.phone_number,
                        email: result.email,
                        user_name: result.user_name,
						lastname : result.lastname
                    });

                else if (result == null)
                    return res["boom"].notFound("The tutor with the specified email id is not found");
            }).catch(function (err) {
                next(err);
            });
        });

        return router;
    }
}