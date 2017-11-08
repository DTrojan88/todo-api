//library imports
require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');


var app = express();
//middleware
app.use(bodyParser.json());

//active port
const activePort = process.env.PORT;

//post route
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET route
app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/:id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send('Id Invalid');
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('Id not found');
          }
    res.send({todo});
  }, (e) => {
    res.status(400).send();
  });
});

//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send('Id Invalid');
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('ID not found!');
    }
    res.status(200).send({todo});
  }, (e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);
  if(!ObjectID.isValid(id)) {
    res.status(404).send('Id Invalid');
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send('Todo ID not found!')
    }
    res.status(200).send({todo});
  }, (e) => {
    res.status(400).send();
  })

});

app.listen(activePort, () => {
  console.log('Started on port', activePort);
});

module.exports = {app};
