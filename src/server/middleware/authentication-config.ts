import * as passport from "passport";
import * as passportlocal from "passport-local";
import {User as User} from "./../model/user/userDocumentSchema";

export class AuthenticationConfigManager {

    public static configure() {
        var Strategy = passportlocal.Strategy;

        passport.use(new Strategy(
            function (username, password, done) {
                User.findOne({ 'userName': username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false);
                    }

                    let bcrypt = require("bcrypt");
                    if (bcrypt.compareSync(password, user.password_hash)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                });
            })
        );

        passport.serializeUser(function (user, cb) {
            cb(null, user);
        });
    }
}
