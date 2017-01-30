import * as express from "express";
import {AccountController as AccountController} from "./../routes/account/account.manage.route";
import {RevisionPackController as RevisionPackController} from "./../routes/revisionPack/revisionPack.manage.route";
import {TutorInformationController as TutorInformationController} from "./../routes/tutorInfo/tutorInfo.manage.route";

export class RouteRegistration {
    static configure(app: express.Application) {
        let guard = require('express-jwt-permissions')();

        app.use("/api/account", AccountController.routes(app));

        app.use("/api/revisionpack", RevisionPackController.routes(app));

        app.use("/api/tutorinformation", TutorInformationController.routes(app));
    }
}