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
};

module.exports.statesChange = function (req, res) {
  var d = req.query.date;
  var id = req.query.id;
  Habit.findById(id, (err, habit) => {
    if (err) {
      console.log("Error updating status!");
    } else {
      let dates = habit.dates;
      let found = false;
      dates.find(function (item, index) {
        if (item.date === d) {
          if (item.complete === "yes") {
            item.complete = "no";
          } else if (item.complete === "no") {
            item.complete = "none";
          } else if (item.complete === "none") {
            item.complete = "yes";
          }
          found = true;
        }
      });
      if (!found) {
        dates.push({ date: d, complete: "yes" });
      }
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
};
