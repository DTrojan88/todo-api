// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({_id: new ObjectID('59f5d50bb6ca54f04df121dd')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count : ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });
  var userName = 'Yvonne';

  db.collection('Users').find({name: userName}).count().then((count) => {
    console.log(`${count} users found`);

  }, (err) => {
    console.log('Unable to get user count!');
  }).then(
    db.collection('Users').find({name: userName}).toArray().then((docs) => {
        console.log(`Users: ${JSON.stringify(docs, undefined, 2)}`);
      }, (err) => {
        console.log('Unable to fetch Users');
      })
    );

  // db.close();
});
