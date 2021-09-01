const Habit = require("../models/habit");
module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.newHabit = function (req, res) {
  console.log(req.body);

  // const { content } = req.body;
  // Habit.create({ content: content }, function (error, habit) {
  //   if (error) {
  //     console.log(`Error in creating new habit ${error}`);
  //     return;
  //   }
  //   console.log(`new habit is created :: ${habit}`);
  //   return res.redirect("back");
  // });
};
