const bodyParser = require("body-parser");
const express = require("express");
const db = require("./config/mongoose");
const port = process.env.PORT || 8080;
const app = express();

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
    return;
  }
  console.log(`Server is running on port no ${port}`);
});
