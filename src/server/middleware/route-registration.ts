import * as express from "express";
import {AccountController as AccountController} from "./../routes/account/account.manage.route";
import {ContentController as ContentController} from "./../routes/content/content.manage.route";

export class RouteRegistration {
    static configure(app: express.Application) {
        let guard = require('express-jwt-permissions')();

        app.use("/api/account", AccountController.routes(app));

        app.use("/api/content", ContentController.routes(app));
    }
}