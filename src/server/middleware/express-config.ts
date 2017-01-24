import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as jwt from "express-jwt";
import * as unless from "express-unless";
import {Config as Config} from "./../config";
var boom = require('express-boom');
var cors = require("cors");
import * as passport from "passport";

export class ExpressConfigManager {
    public static configure(app: express.Application): express.Application {
        console.log("initializing express");
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.use(jwt({ secret: Config.webtokenSignatureSecretKey })
            .unless(
            {
                path: [
                    new RegExp('/api/account.*/', 'i'),
                    new RegExp('/api/revisionpack.*/', 'i'),
                    //new RegExp('/api/tutor/profile/recommend.*/', 'i')
                ]
            }));
        app.use(boom());
        app.use(cors());
        return app;
    }
}