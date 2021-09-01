const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
