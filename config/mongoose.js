const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://abhishek:abhishek@cluster0.pacpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to DataBase :: MongoDB");
});

// module.exports = db;
// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://abhishek:abhishektest@cluster0.pacpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log("Connected to DataBase :: MongoDB");
//   // perform actions on the collection object
//   client.close();
// });

// module.exports = {
//   MongoURI:
//     "mongodb+srv://Z4HMUo0JffOPhueM:Z4HMUo0JffOPhueM@cluster0.ov73y.mongodb.net/Z4HMUo0JffOPhueM?retryWrites=true&w=majority",
// };
