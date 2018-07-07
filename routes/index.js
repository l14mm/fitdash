var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');
// const Cat = mongoose.model('cat', { name: String });

router.get('/', function(req, res, next) { //   /:catName

  var userData = new User({
    email: "email122",
    username: "username123",
    password: "password1",
    passwordConf: "passwordconf1",
  });
  console.log("adding user1");
  userData.save(function (err) {
    if (err) {console.log(err)};
    console.log("user added!")
    // saved!
  });

  res.json({ a: "hi" });
});
/* GET home page. */
router.post('/', function(req, res, next) { //   /:catName

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
      if (err) {console.log(err)};
      console.log("user added!")
    });
  }
  else {
    console.log("no user defined");
  }

  res.json({ a: "hi" });
});

module.exports = router;
