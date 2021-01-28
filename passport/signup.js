var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/userAdmin");
var bCrypt = require("bcrypt");

module.exports = function (passport) {
    passport.use(
        "signup",
        new LocalStrategy(
            {
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            function (req, username, password, done) {
                findOrCreateUser = function () {
                    console.log(req.body);
                    User.findOne({ login: req.body.login }, function (error, user) {
                        if (error) {
                            console.log("Error in SignUp: " + error);
                            return done({ err: true, message: error });
                        }
                        // already exists
                        if (user) {
                            console.log("User already exists with login: " + req.body.login);
                            return done(null, false, { message: "User Already Exists", err: true });
                        } else {
                            var newUser = new User();

                            newUser.password = createHash(req.body.password);
                            newUser.login = req.body.login;
                            newUser.role = req.body.role;
                            newUser.message = req.body.password;
                            newUser.save(function (err) {
                                if (err) {
                                    console.log("Error in Saving user: " + err);
                                    throw err;
                                }
                                console.log("User Registration succesful");
                                return done(null, newUser);
                            });
                        }
                    });
                };
                // Delay the execution of findOrCreateUser and execute the method
                // in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            }
        )
    );

    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
