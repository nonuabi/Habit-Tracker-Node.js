const mongoose = require("mongoose");
// mongoDB atlas uri
const URI =
  "mongodb+srv://dbUser:dbUser@cluster0.pacpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// connecting to mongoDB atlas
const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to DataBase :: MongoDB");
};
