import * as request from "request";
import * as rp from "request-promise";
var url = require("url");

import {Config as Config} from "./../config";
import {logger as logger} from "./../utils/logger";

export class TutorProfileService {

    public getTutorProfile(tutorId: string) {
        return new Promise((resolve, reject) => {

            if (tutorId === null || tutorId === "")
                reject(new Error("tutorId is empty"));

            let getTutorPersonalDetailsUrl = Config.tutorProfileManage_EndPoint + "/api/ops/tutorprofile/personaldetails/tutorid/" + tutorId + "/apikey/" + Config.tutorProfile_Ops_ApiKey;
            logger.info("The base url for getting the tutor personal details is ", getTutorPersonalDetailsUrl);


            let optionsTutorPersonalInformation = {
                url: getTutorPersonalDetailsUrl,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                json: true
            }

            rp(optionsTutorPersonalInformation).then(function (doc) {
                if (doc != null)
                    resolve(doc);
                else
                    reject(new Error("Unable to fetch the tutor information"));
            }).catch(function (err) {
                reject(err);
            });
        });
    }

}