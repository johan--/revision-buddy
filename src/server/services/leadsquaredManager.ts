import * as http from "request";
import * as rp from "request-promise";

import {logger as logger} from "./../utils/logger";
import {Config as Config} from "./../config";

var moment = require("moment");
var url = require("url");

import {LSActivityEventsImpl as LSActivityEventsImpl} from "./../model/lsactivity/lsactivity.events.impl";
import {IUserDocument as IUserDocument} from "./../model/user/userDocument";

export class LeadSquaredManager {

    private lsGatewayEndPointBaseUrl: string;
    private lsActivityEvents: LSActivityEventsImpl;

    public get activityEventConstants(): LSActivityEventsImpl {
        return this.lsActivityEvents;
    }

    constructor() {
        this.lsActivityEvents = new LSActivityEventsImpl();
        this.lsGatewayEndPointBaseUrl = Config.lsGateway_APIEndPoint_BaseUrl;
    }

    public createActivity(user: IUserDocument, activityNote : string, activityEvent: number, next): any {

        let options = {
            url: this.lsGatewayEndPointBaseUrl + "/api/v2/LeadManagement/Parent/CreateActivity",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            json: {
                "ActivityEvent": activityEvent,
                "ActivityNote": activityNote,
                "RelatedProspectId": user.lead_id, //Revist this later
                "ActivityDateTime": moment.utc().format("YYYY-MM-DD HH:mm:ss")
            }
        }

        logger.info("The endpoint url is ", options.url, " ad prospect id id is ", options.json.RelatedProspectId, " and date is ", moment.utc().format("YYYY-MM-DD HH:mm:ss"));
        logger.info(JSON.stringify(options.json));

        http(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                next(null, response);
            }
            else {
                next(error);
            }
        });
    }

    public getLeadDetails(leadId: string) : any {
        return new Promise((resolve, reject) => {

            let getLeadDetailsUrl = this.lsGatewayEndPointBaseUrl + "/api/v2/LeadManagement/Parent/SearchById?leadid=" + leadId;  //url.resolve(Config.identityEndPoint, ("/api/account/user/email/" + userEmail + "/apikey/" + Config.identity_ApiKey));

            let optionsGetLeadDetails = {
                url: getLeadDetailsUrl,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                json: true
            }

            rp(optionsGetLeadDetails).then(function (doc) {
                resolve(doc);
            }).catch(function (err) {
                reject(err);
            });
        });
    }
}