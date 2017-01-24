var nodemailer = require("nodemailer");
var gmailSend = require("gmail-send");

import {logger as logger} from "./../utils/logger";
import {Config as Config} from "./../config";

export class MailService {

    private static transporter = nodemailer.createTransport("smtps://user%40gmail.com:pass@smtp.gmail.com");;

    public static sendMailForNewUserCreated1(user, password) {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
                to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world ?', // plaintext body
                html: '<b>Hello world ?</b>' // html body
            };

            MailService.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(new Error("Error in sending email to user" + user.email));
                }
                resolve("Welcome email sent to user " + user.email);
            });
        });
    }


    public static sendMailForNewUserCreated(user, password) {
        return new Promise((resolve, reject) => {

            var send = gmailSend({
                user: Config.smtp_UserName, // Your GMail account used to send emails 
                pass: Config.smtp_UserName, // Application-specific password 
                to: user.email,      // Send back to yourself 
                from: Config.default_FromAddress, // from: by default equals to user 
                
                subject: "Hello !!!",
                text: 'Hello world ?', // plaintext body
                html: '<b>Hello world ?</b>' // html body
            });

            send({}, function (err, res) {
                if (err)
                    reject(err);

                if (res)
                    resolve(res);
            });

        });
    }
}