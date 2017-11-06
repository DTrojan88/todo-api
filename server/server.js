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
var activePort = 3000;

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

//get route
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

  // if(!ObjectID.isValid(id)) {
  //   console.log('Id not valid');
  // } else {
  //   Todo.findById(id).then((todo) => {
  //     if(!todo) {
  //       return console.log('Todo not found!');
  //     } console.log('Todo:', JSON.stringify(todo, undefined, 2));
  //   }).catch((e) => console.log(e));
  // }

  if(!ObjectID.isValid(id)) {
    res.status(404).send('Id Invalid');
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('Id not found');
          }
    res.send(todo);
  }, (e) => {
    res.status(404).send()
  });

  //validate id -- if not found respond with code 404
});

app.listen(activePort, () => {
  console.log('Started on port', activePort);
});

module.exports = {app};
