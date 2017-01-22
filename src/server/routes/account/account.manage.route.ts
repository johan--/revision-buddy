import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as Joi from "joi"
import * as http from "request";
import * as jwt from "express-jwt";
import * as _ from "underscore";

export class AccountController {

    constructor() {
    }

    public registerRoutes(app: express.Application): any {

        let router = express.Router();


        return router;
    }
}