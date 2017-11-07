//library imports
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');


var app = express();
//middleware
app.use(bodyParser.json());

//active port
const activePort = process.env.PORT || 3000;

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

//GET /todos/123456
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send('Id Invalid');
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('Id not found');
          }
    res.send(todo);
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
    res.status(200).send(`Successfully removed id ${id}`);
  }, (e) => {
    res.status(400).send();
  });
});

app.listen(activePort, () => {
  console.log('Started on port', activePort);
});

module.exports = {app};
