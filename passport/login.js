const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userAdmin");
const bCrypt = require("bcrypt");

module.exports = function (passport) {
    passport.use(
        "login",
        new LocalStrategy(
            {
                passReqToCallback: true,
            },
            function (req, username, password, done) {
                User.findOne({ login: req.body.login }, function (err, user) {
                    if (err) return done(err);

                    if (!user) {
                        console.log("User Not Found with login " + req.body.login);
                        return done(null, false, { message: "User Not Found with login " + req.body.login, err: true });
                    }

                    if (!isValidPassword(user, req.body.password)) {
                        return done(null, false, { message: "Invalid Password", err: true });
                    }

                    return done(null, user);
                });
            }
        )
    );

    var isValidPassword = function (user, password) {
        console.log(bCrypt.compareSync(password, user.password));
        return bCrypt.compareSync(password, user.password);
    };
};
