// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    //   console.log(result);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //   console.log(result);
    // })
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //   console.log(result);
    // });
    // db.collection('Users').deleteMany({name: 'Derrick'}).then((result) => {
    //   console.log(result);
    // });

    var id = new ObjectID('59f6047eb6ca54f04df12693');
    db.collection('Users').findOneAndDelete({_id: id}).then((result) => {
      console.log(JSON.stringify(result,undefined,2));
    })
  // db.close();
});
