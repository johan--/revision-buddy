import * as http from "http";
import * as https from "https";
import * as fs from "fs";

import {Db as Db} from "./data/db";
import {Config as Config} from "./config";
import * as bodyParser from "body-parser";
import * as express from "express";
import {logger as logger} from "./utils/logger";
import {ErrorHandler as ErrorHandler} from "./middleware/error-handler";
import {MiddlewareConfigManager as MiddlewareConfigManager} from "./middleware/config-base";

require("dotenv").config();
require("dotenv-safe").load();

Db.connect();

var server,
    app = new MiddlewareConfigManager()
        .application;

if (process.env.SSL_ENABLED) {
    var sslOptions = {
        key: fs.readFileSync(Config.sslKeyFile),
        cert: fs.readFileSync(Config.sslCertFile),
    };
    server = https.createServer(sslOptions, app); // Secure https server
} else {
    server = http.createServer(app);              // Insecure http server
}

let handler = new ErrorHandler(app, server);
handler.configure();

server.listen(Config.port, function () {
    logger.info("Listening on ", Config.port);
});
