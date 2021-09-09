const mongoose = require("mongoose");

const URI =
  "mongodb+srv://dbUser:dbUser@cluster0.pacpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to DataBase :: MongoDB");
};

module.exports = connectDB;

// mongoose.connect(
//   "mongodb+srv://abhishek:abhishek@cluster0.pacpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// );

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// db.once("open", function () {
//   console.log("Connected to DataBase :: MongoDB");
// });
