// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('unable to connect to mongodb server');
    return;
  }
  console.log('connected to mongodb server');

  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to featch todos', err);
  // });

  // db.collection('Todos').find({completed: false}).count().then((count, err) => {
  //   console.log('todos');
  //   console.log(`count: ${count}`);
  // }, (err) => {
  //   console.log('unable to featch todos', err);
  // });

  db.collection('Users').find({name: 'bill'}).toArray().then((docs, err) => {
    console.log('todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('unable to featch todos', err);
  });


  db.close();
});