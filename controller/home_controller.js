const Habit = require("../models/habit");
module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.newHabit = function (req, res) {
  console.log(req.body);
  const { content } = req.body;

  Habit.findOne({ content: content }).then((habit) => {
    if (habit) {
      //---------Update existing habit----------//
      let dates = habit.dates,
        tzoffset = new Date().getTimezoneOffset() * 60000;
      var today = new Date(Date.now() - tzoffset).toISOString().slice(0, 10);
      dates.find(function (item) {
        if (item.date === today) {
          console.log("Habit exists!");
          console.log("error_msg", "Habit already exists!");
          res.redirect("back");
        } else {
          dates.push({ date: today, complete: "none" });
          habit.dates = dates;
          habit
            .save()
            .then((habit) => {
              console.log(habit);
              res.redirect("back");
            })
            .catch((err) => console.log(err));
        }
      });
    } else {
      let dates = [],
        tzoffset = new Date().getTimezoneOffset() * 60000;
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, 10);
      dates.push({ date: localISOTime, complete: "none" });
      const newHabit = new Habit({
        content,
        dates,
      });

      //---------Save Habit----------//
      newHabit
        .save()
        .then((habit) => {
          console.log(habit);
          res.redirect("back");
        })
        .catch((err) => console.log(err));
    }
  });
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
