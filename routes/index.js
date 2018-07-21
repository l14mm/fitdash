var express = require('express');
const jwt = require('jwt-simple');
var router = express.Router();
var User = require('../models/user');
const config = require('../config.js');
const passportService = require('../services/pasport');
const passport = require('passport');

// Authenticate using jwt, don't setup a session for user
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

router.get('/userDetails', requireAuth, function (req, res, next) {
  res.json({ username: req.user.username, mfpUsername: req.user.mfpUsername, layout: req.user.layout });
});

router.post('/saveDetails', requireAuth, function (req, res, next) {
  User.findOneAndUpdate({ username: req.user.username }, {
    ...req.body
  }, { new: false }, function (err, doc) {
    if (err) { return next(err); }

  });
  res.json({ message: "succesfully saved" });
});

router.post('/register', function (req, res, next) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (!email || !username || !password) {
    return res.status(422).send({ error: "You must provide an email, username and password" });
  }

  User.findOne({ username: username }, function (err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: "Username already exists" });
    }

    const user = new User({
      email: email,
      username: username,
      password: password
    });

    user.save(function (err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user) });
    });
  });
});

router.post('/login', requireLogin, function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user), hi: req.user.username });

});

module.exports = router;