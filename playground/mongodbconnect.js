// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('unable to connect to mongodb server');
    return;
  }
  console.log('connected to mongodb server');

  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     console.log('unable to insert todo');
  //     return;
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'bob smith',
  //   age: 50
  // }, (err, result) => {
  //   if (err) {
  //     console.log('error inserting into Users collection');
  //     return;
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.close();
});