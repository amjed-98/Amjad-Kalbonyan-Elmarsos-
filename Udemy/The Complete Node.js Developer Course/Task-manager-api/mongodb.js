// const { MongoClient, ObjectID } = require('mongodb');

// const connectionURL = 'mongodb://127.0.0.1:27017';
// const dbName = 'task-manager';

// const id = new ObjectID();

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) return console.log('unable');

//     const db = client.db(dbName);

//     // db.collection('users')
//     //   .updateOne(
//     //     { _id: ObjectID('61c9c4e8eb1a3322e8b017f1') },
//     //     { $inc: { age: 1 } }
//     //   )
//     //   .then((result) => console.log(result))
//     //   .catch((err) => console.log(err));

//     // db.collection('tasks')
//     //   .updateMany({ completed: false }, { $set: { completed: true } })
//     //   .then((result) => {
//     //     console.log(result);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });

//     // db.collection('users')
//     //   .deleteMany({ age: 27 })
//     //   .then((result) => {
//     //     console.log(result);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });

//     // db.collection('tasks')
//     //   .deleteOne({ description: 'watch movie' })
//     //   .then((result) => {
//     //     console.log(result);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//   }
// );
