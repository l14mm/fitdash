var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');

router.get('/', function (req, res, next) { //   /:catName
  User.find(function (err, results) {
    //assert.equal(null, err);
    //console.log(results);
    //invoke callback with your mongoose returned result
    //callback(results);
    res.json(results);
  });
});

router.post('/', function (req, res, next) {
  // confirm that passwords matches password confirmation
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    var userData = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    });
    userData.save(function (err) {
      if (err) {
        console.log(err)
      };
      console.log("user added!");
      res.json({
        response: "user added!"
      });
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }


  // //use sessions for tracking logins
  // app.use(session({
  //   secret: 'work hard',
  //   resave: true,
  //   saveUninitialized: false
  // }));
  // reader/index.js
});

// GET route after registering
router.get('/checksession', function (req, res, next) {
  app.use(function checkSession(req, res, next) {
    if (!req.session.user) {
      //alternately: res.redirect('/login')
      return res.json(403, {
        'message': 'Please go "log in!" (set up your session)',
        'login': '/login'
      });
    } else {
      next();
    }
  });
  // reader/index.js
  app.get('/', function displayCount(req, res) {
    res.json({
      user: req.session.user,
      count: req.session.count
    })
  });
});

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.json({
          name: user.name,
          email: user.email
        });
      }
    });
});

// GET /logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;