import * as express from "express";
import {AccountController as AccountController} from "./../routes/account/account.manage.route";
import {CourseController as CourseController} from "./../routes/course/course.manage.route";

export class RouteRegistration {
    static configure(app: express.Application) {
        let guard = require('express-jwt-permissions')();

        app.use("/api/account", AccountController.routes(app));

        app.use("/api/course", CourseController.routes(app));
    }
}