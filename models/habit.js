const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    dates: [
      {
        date: String,
        complete: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
