const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '5b146dafdbe773ade705d660';

// if (!ObjectID.isValid(id)) {
//   console.log('id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos', todos);
// }).catch((e) => console.log(e));

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo', todo);
// }).catch((e) => console.log(e));

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('id not found');
//   }
//   console.log('todo', todo);
// }).catch((e) => console.log(e));


var userId = '5b140d77589268fbd740b413';

User.find({
  _id: userId
}).then((users) => {
  console.log('users', users);
}).catch((e) => console.log(e));

User.findOne({
  _id: userId
}).then((user) => {
  console.log('user', user);
}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if(!user) {
    return console.log('user not found');
  }
  console.log('user', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
