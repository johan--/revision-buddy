import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as Joi from "joi"
import * as http from "request";
import * as jwt from "express-jwt";
import * as _ from "underscore";

import {logger as logger} from "./../../utils/logger";
import {UserService as UserService}  from "./../../services/userService";
import {TutorProfileService as TutorProfileService}  from "./../../services/tutorProfileService";

export class TutorInformationController {

    public static routes(app: express.Application): any {

        let router = express.Router();

        router.get("/details/tutorid/:id", function (req, res, next) {
            
            let userService = new UserService();
            let tutorProfileService = new TutorProfileService();

            let p2 = tutorProfileService.getTutorProfile(req.params.id);
            let p1 = userService.getUserById(req.params.id);

            Promise.all([p1, p2]).then(function (results) {
                let userDetails = results[0];
                let tutorProfileDetails = results[1];

                if (userDetails == null)
                    return res["boom"].notFound("The tutor with the specified id is not found");

                return res.status(200).send({
                    user_id: userDetails._id,
                    firstname: userDetails.firstname,
                    phone_number: userDetails.phone_number,
                    email: userDetails.email,
                    user_name: userDetails.user_name,
                    lastname: userDetails.lastname,
                    tutor_personaldetails : tutorProfileDetails
                });

            }).catch(function (err) {
                next(err);
            });
        });

        return router;
    }
}