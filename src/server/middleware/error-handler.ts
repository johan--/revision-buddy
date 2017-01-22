import * as express from "express";
import {logger as logger} from "./../utils/logger";
//var errorHandler = require("express-error-handler");

export class ErrorHandler {

    private app: express.Application;
    private server: any;

    constructor(app: express.Application, server: any) {
        this.app = app;
        this.server = server;
    }

    public configure() {



        if (this.app.get("env") === "development") {
            this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
                logger.error("Under development");

                logger.error(err);

                if (err.isBoom) {
                    return res.status(err.output.statusCode).json(err.output.payload);
                }

                if (err.code === 'permission_denied') {
                    return res.status(401).send('Insufficient Permissions');
                }

                return res.status(err.status || 500).send({
                    message: err.message,
                    error: err
                });
                //next(err);
            });
        }
        else {
            this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

                logger.error(err);

                if (err.isBoom) {
                    return res.status(err.output.statusCode).json(err.output.payload);
                }

                if (err.code === 'permission_denied') {
                    return res.status(401).send('Insufficient Permissions');
                }

                return res.status(err.status || 500).send({
                    message: err.message,
                    error: {} //hide stack trace from production
                });

                //next(err);
            });
        }


        //let handlerConfig = errorHandler(
        //    {
        //        server: this.server
        //        //handlers: {
        //        //    '404': function err404() {
        //        //        // do some custom thing here...
        //        //    }
        //        //},
        //        //serializer: function (err) {
        //        //    var body = {
        //        //        status: err.status,
        //        //        message: err.message
        //        //    };
        //        //    //if (createHandler.isClientError(err.status)) {
        //        //    //    ['code', 'name', 'type', 'details'].forEach(function (prop) {
        //        //    //        if (err[prop]) body[prop] = err[prop];
        //        //    //    });
        //        //    //}
        //        //    return body;
        //        //}
        //    });

        //ToDo::This is throwing an error and crashing node. Parkign it for later. for now using the default express error handling
        //this.app.use(errorHandler({ server: this.server }));
    }
}