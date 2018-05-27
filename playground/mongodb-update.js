// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('unable to connect to mongodb server');
    return;
  }
  console.log('connected to mongodb server');

  // db.collection('Todos').findOneAndUpdate(
  //   { _id: new ObjectID('5b078736cb2ae6d2c39956a5') },
  //   { $set: {completed: false} },
  //   { returnOriginal: false }
  // ).then(res => {
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate(
    { _id: new ObjectID('5b0768e04561488414a81916') },
    { 
      $set: { 
        name: 'kris' 
      },
      $inc: {
        age: 2
      }
    },
    { returnOriginal: false }
  ).then(res => {
    console.log(res);
  });

  db.close();
});