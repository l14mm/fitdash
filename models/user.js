var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  layout: {
    type: Object,
    required: false
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err){return callback(err);}

    callback(null, isMatch);
  })
}

// Authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
          return next(err);
        }
      })
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// Hash a password before saving it to the database
UserSchema.pre('save', function (next) {
  // Get access to user model instance
  var user = this;

  // Generate a salt then hash
  bcrypt.genSalt(10, function(err, salt) {
    // Hash password using salt
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});


var User = mongoose.model('User', UserSchema);
module.exports = User;