var nodemailer = require("nodemailer");
var gmailSend = require("gmail-send");

import {logger as logger} from "./../utils/logger";
import {Config as Config} from "./../config";

export class MailService {
    
    public static sendMailForNewUserCreated(user, password) {
        return new Promise((resolve, reject) => {

            var send = gmailSend({
                user: Config.smtp_UserName, // Your GMail account used to send emails 
                pass: Config.smtp_Password, // Application-specific password 
                to: user.email,      // Send back to yourself 
                from: Config.default_FromAddress, // from: by default equals to user 
                
                subject: "Welcome to Vidyanext",
                text: 'Hello world ?', // plaintext body
                html: '<b>UserName : </b>' + user.user_name + ' <b> Password : </b>' + password // html body
            });

            send(function (err, res) {
                if (err) {
                    logger.error("Error in sending email to user " + user.email);
                    reject(new Error("Error in sending email to user" + user.email));
                }

                logger.info("Welcome email sent to user" + user.email);
                resolve("Welcome email sent to user " + user.email);
            });

        });
    }

    public static sendMailForPasswordReset(user, password) {
        return new Promise((resolve, reject) => {

            var send = gmailSend({
                user: Config.smtp_UserName, // Your GMail account used to send emails 
                pass: Config.smtp_Password, // Application-specific password 
                to: user.email,      // Send back to yourself 
                from: Config.default_FromAddress, // from: by default equals to user 

                subject: "Hello !!!",
                text: 'Hello world ?', // plaintext body
                html: '<b>UserName : </b>' + user.user_name + ' <b> Password : </b>' + password // html body
            });

            send(function (err, res) {
                if (err) {
                    logger.error("Error in sending email to user " + user.email);
                    reject(new Error("Error in sending email to user" + user.email));
                }

                logger.info("Welcome email sent to user" + user.email);
                resolve("Welcome email sent to user " + user.email);
            });

        });
    }
}