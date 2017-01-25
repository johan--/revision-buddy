import TsEventEmitter from 'ts-eventemitter';
import {logger as logger} from "./utils/logger";

import {Config as Config} from "./config";

import {LeadSquaredManager as LeadSquaredManager} from "./services/leadsquaredManager";
import {MailService as MailService} from "./services/mailService";
//import {TutorProfileStoreStatus as TutorProfileStoreStatus} from  "./constants";

export interface RevisionPackEventEmitter extends TsEventEmitter {
    event(name: 'newUserCreated'): TsEventEmitter.Event1<this, Object>;
    event(name: 'newRevisionPackSubscribed'): TsEventEmitter.Event1<this, Object>;
    event(name: 'passwordReset'): TsEventEmitter.Event1<this, Object>;
    event(name: string): TsEventEmitter.Event;
}

const RevisionPackEventEmitter: any = TsEventEmitter.create();
export default RevisionPackEventEmitter;

RevisionPackEventEmitter.event("newUserCreated").on((user, password) => {

    logger.info("Writing a custom acitivity on LS. This will be deprecated later");
    logger.info("Event :: newUserCreated");

    let lsManager = new LeadSquaredManager();

    lsManager.createActivity(user, "New account created revision buddy", lsManager.activityEventConstants.RevisionPackAcccountCreated, function (err, res) {
        if (err)
            logger.error("Unable to create an activity on leadsqaured for the new user created in revision buddy");

        if (!err && res.statusCode == 200)
            logger.info("Activity for new user created in revisio buddy is updated on LS");
    });

    //MailService.sendMailForNewUserCreated(user, password).then(
    //    logger.info("mail sent successfully")).catch(function (err) {
    //    logger.error(err);
    //});

});


RevisionPackEventEmitter.event("newRevisionPackSubscribed").on((user, revisionPackSubscribed) => {

    logger.info("Writing a custom acitivity on LS. This will be deprecated later");
    logger.info("Event :: newRevisionPackSubscribed");

    let lsManager = new LeadSquaredManager();

    lsManager.createActivity(user, "New revision pack  for Board: " + revisionPackSubscribed.board + ", Class: " + revisionPackSubscribed.class + ", Subject: " + revisionPackSubscribed.subject +
        " added for the user", lsManager.activityEventConstants.RevisionPackNewPackSubscribed, function (err, res) {
        if (err)
            logger.error("Unable to create an activity on leadsqaured for the new subscription pack subscribed by user in revision buddy");

        if (!err && res.statusCode == 200)
            logger.info("Activity for new revision pack subscribed for user in revision buddy is updated on LS");
    });
});


RevisionPackEventEmitter.event("passwordReset").on((user, password) => {

    logger.info("Writing a custom acitivity on LS. This will be deprecated later");
    logger.info("Event :: passwordReset");
    
    //MailService.sendMailForNewUserCreated(user, password).then(
    //    logger.info("mail sent successfully")).catch(function (err) {
    //    logger.error(err);
    //});

});