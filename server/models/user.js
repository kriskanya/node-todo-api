const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

// instance methods
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  // .sign(data, secret)
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.concat([{access, token}]);

  // return promise
  return user.save().then(() => {
    return token;
  });
};

// {
//   email: 'kriskanya@example.com',
//   password: 'asdfafaeffdafddf',
//   token: [{
//     access: 'auth',
//     token: 'ooineeteafdadfafd'
//   }]
// }

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
