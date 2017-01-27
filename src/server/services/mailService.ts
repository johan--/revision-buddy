var nodemailer = require("nodemailer");
var gmailSend = require("gmail-send");

import {logger as logger} from "./../utils/logger";
import {Config as Config} from "./../config";

export class MailService {
    
    public static sendMailForNewUserCreated(user, password) {

        let path = require("path")
        let templateDir = path.join(__dirname, "templates", "welcome-email");

        let EmailTemplate = require("email-templates").EmailTemplate

        let template = new EmailTemplate(templateDir);
        let detailsForMailTemplate = {
            username: user.user_name,
            password: password
        }

        return new Promise((resolve, reject) => {
            var result = template.render(detailsForMailTemplate, function (err, result) {

                if (err) {
                    logger.error(err);
                    reject(err);
                }

                logger.info(result.html);
                logger.info(result.text);
                logger.info(result.subject);


                let send = gmailSend({
                    user: Config.smtp_UserName, // Your GMail account used to send emails 
                    pass: Config.smtp_Password, // Application-specific password 
                    to: user.email,      // Send back to yourself 
                    from: Config.default_FromAddress, // from: by default equals to user 

                    subject: result.subject,
                    text: result.text, // plaintext body
                    html: result.html
                });

                send(function (err, res) {
                    if (err) {
                        logger.error("Error in sending email to user " + user.email);
                        reject(new Error("Error in sending email to user" + user.email));
                    }

                    logger.info("Welcome email sent to user" + user.email);
                    resolve("Welcome email sent to user " + user.email);
                });

                resolve("done");
            });
        });
    }

    public static sendMailForPasswordReset(user, password) {
        let path = require("path")
        let templateDir = path.join(__dirname, "email-templates", "password-reset");

        let EmailTemplate = require("email-templates").EmailTemplate

        let template = new EmailTemplate(templateDir);
        let detailsForMailTemplate = {
            username: user.user_name,
            password: password
        }

        return new Promise((resolve, reject) => {
            var result = template.render(detailsForMailTemplate, function (err, result) {

                if (err) {
                    logger.error(err);
                    reject(err);
                }

                logger.info(result.html);
                logger.info(result.text);
                logger.info(result.subject);


                let send = gmailSend({
                    user: Config.smtp_UserName, // Your GMail account used to send emails 
                    pass: Config.smtp_Password, // Application-specific password 
                    to: user.email,      // Send back to yourself 
                    from: Config.default_FromAddress, // from: by default equals to user 

                    subject: result.subject,
                    text: result.text, // plaintext body
                    html: result.html
                });

                send(function (err, res) {
                    if (err) {
                        logger.error("Error in sending email to user " + user.email);
                        reject(new Error("Error in sending email to user" + user.email));
                    }

                    logger.info("Password reset email sent to user" + user.email);
                    resolve("Password reset email sent to user " + user.email);
                });

                resolve("done");
            });
        });
    }
}