const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'user1@example.com', 
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoID,
  email: 'user2@example.com',
  password: 'userTwoPass'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: false,
  completedAt: 333
}]

const populateTodos = (done) => {
  // wipe all Todos in database and insert todos above
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

// need to add to teh DB using 'save()', so that the middleware is used
const populateUsers = (done) => {
  // remove all records
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    // wait for all save actions to complete using Promise.all
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };