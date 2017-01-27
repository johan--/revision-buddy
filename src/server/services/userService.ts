import * as request from "request";
import * as rp from "request-promise";
var url = require("url");

import {Config as Config} from "./../config";
import {logger as logger} from "./../utils/logger";

export class UserService {

    constructor() {
    }

    public getUser(userEmail: string): any {
        
        return new Promise((resolve, reject) => {

            try {
                if (userEmail === null || userEmail === "")
                    reject(new Error("User email is empty"));

                let getUserInformationUrl = Config.identityEndPoint + "/api/account/user/email/" + userEmail + "/apikey/" + Config.identity_ApiKey;
                logger.info("The base url for updating the user lead identifier is ", getUserInformationUrl);

                let optionsGetUserInformation = {
                    url: getUserInformationUrl,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    json: true
                }

                rp(optionsGetUserInformation).then(function (doc) {
                    if (doc != null)
                        resolve(doc);
                    else
                        reject(new Error("Unable to fetch the user information from identity"));
                }).catch(function (err) {
                    reject(err);
                });
            }
            catch(e){
                reject(e);
            }
        });
    }
}