const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Grabs username and password field from body
const localLogin = new LocalStrategy(function (username, password, done) {
    // Verify this username and password, call done with the user
    // if it is the correct username and password
    // otherwise, call done with false
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        // compare passwords - is 'password' equal to user.password?
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        })
    })
})

// Setup options for JWT strategy
const jwtOptions = {
    // Extract jwt from authorization header;
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if user ID in the payload exists in our database
    // If it does, call done with that object
    // otherwise, call done without a user object
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);