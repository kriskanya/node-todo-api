const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// new mongoose.Schema allows us to add methods to the user model, which will
// help with authentication
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// only return '_id' and 'email' properties of user in response
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  
  return _.pick(userObject, ['_id', 'email']);
};

// define instance methods
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  // .sign(data, secret)
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat({access, token});

  // return promise
  return user.save().then(() => {
    return token;
  });
};

// define static methods
UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

// runs the code before the event 'save'
UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
  
});

// {
//   email: 'kriskanya@example.com',
//   password: 'asdfafaeffdafddf',
//   token: [{
//     access: 'auth',
//     token: 'ooineeteafdadfafd'
//   }]
// }

const User = mongoose.model('User', UserSchema);

module.exports = { User };
