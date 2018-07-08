var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
  User.find(function (err, results) {
    //res.json(results);
    if (req.session.page_views) {
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times " + JSON.stringify(results));
      //res.send(results);
    } else {
      req.session.page_views = 1;
      return res.send("Welcome to this page for the first time!");
    }
  });
});

router.post('/register', function (req, res, next) {
  console.log("registering 0");
  console.log(req.body);
  if (req.body.email &&
    req.body.username &&
    req.body.password) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    console.log("registering 1");
    User.findOne({ username: req.body.username })
      .exec(function (err, user) {
        if (err) {
          console.log("error searching for username");
        } else if (!user) {
          console.log("username doesn't exist");
          User.create(userData, function (error, user) {
            if (error) {
              console.log("error creating user");
              return next(error);
            } else {
              console.log("successfully registered");
              req.session.userId = user._id;
              //return res.redirect('/profile');
              return res.send("successfully registered");
            }
          });
        }
        else {
          console.log("username already exists");
        }
      });
  } else {
    var err = new Error('All fields required');
    err.status = 400;
    res.send("All fields required");
    return next(err);
  }
});

router.post('/login', function (req, res, next) {
  console.log("login");
  console.log(req.body);
  if (req.body.username &&
    req.body.password) {
    console.log("logging in");
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error || !user) {
        console.log("Wrong email or password");
        var err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        console.log("logged in");
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.send("Hello world");
        }
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

// GET route after registering
router.get('/checksession', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });

  // // reader/index.js
  // app.get('/', function displayCount(req, res) {
  //   res.json({
  //     user: req.session.user,
  //     count: req.session.count
  //   })
  // });
});

module.exports = router;