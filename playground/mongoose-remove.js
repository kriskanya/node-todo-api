const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// remove all
// Todo.remove({}).then((res) => {

// });

// Todo.findOneAndRemove().then((res) => {
  
// });

// Todo.findByIdAndRemove('').then((res) => {

// });