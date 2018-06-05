var express = require('express');
var bodyParser = require('body-parser')
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

// middleware which allows us to send JSON to our application
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  console.log(req.params.id);
  if (!ObjectID.isValid(req.params.id)) {
    console.log('id not valid');
    return res.status(404).send();
  }

  Todo.findById(req.params.id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }, (err) => {
    res.status(404).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.delete('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(req.params.id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(e => {
    res.send(400).send();
  });
});

app.listen('3000', () => {
  console.log('started on port 3000');
});

module.exports = { app };
