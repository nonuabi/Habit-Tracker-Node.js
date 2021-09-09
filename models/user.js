const mongoose = require("mongoose");

// schema for the default user
const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    View: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
