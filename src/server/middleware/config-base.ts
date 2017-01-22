import * as express from "express";
import {ExpressConfigManager as ExpressConfigManager} from "./express-config";
import {RouteRegistration as RouteRegistration} from "./route-registration";

export class MiddlewareConfigManager {

    private app: express.Application
    constructor() {

        let app = express();
        
        this.app = ExpressConfigManager.configure(app);
        
        RouteRegistration.configure(this.app);
    }

    public get application(): express.Application {

        return this.app;
    }
}
