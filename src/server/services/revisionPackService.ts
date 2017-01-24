import * as request from "request";
import * as rp from "request-promise";
var url = require("url");

import {Config as Config} from "./../config";
import {logger as logger} from "./../utils/logger";
import {RevisionPack as RevisionPack} from "./../model/revisionPack/revisionPackDocumentSchema";

export class RevisionPackService {
    public getCourse(board: string, level: string, subject: string): any {
        return new Promise((resolve, reject) => {
            let query = { "board": board, "class": level, "subject": subject };
            RevisionPack.findOne(query, function (err, result) {
                if (err)
                    reject(err);

                else if (result == null)
                    reject(new Error("Revision pack not found for board : " + board + ", class : " + level + ", subject : " + subject));

                else
                    resolve(result);

            });
        });
    }
}