const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
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
