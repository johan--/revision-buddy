import * as passport from "passport";
import * as passportlocal from "passport-local";
import {User as User} from "./../model/user/userDocumentSchema";

import {logger as logger} from "./../utils/logger";

export class AuthenticationConfigManager {

    public static configure() {
        let Strategy = passportlocal.Strategy;

        passport.use(new Strategy({
            usernameField: 'user_name',
            passwordField: 'password',
        },

            function (username, password, done) {

                User.findOne({ 'user_name': username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false);
                    }

                    let bcrypt = require("bcrypt");
                    if (bcrypt.compareSync(password, user.password_hash)) {
                        return done(null, user._id);
                    }
                    else {
                        return done(null, false);
                    }
                });
            })
        );

        //passport.serializeUser(function (user, cb) {
        //    cb(null, user["_id"]);
        //});
    }
}
