const Habit = require("../models/habit");
module.exports.home = function (req, res) {
  Habit.find({})
    .sort("-createdAt")
    .then((response) => {
      let days = [];
      days.push(getDate(0));
      days.push(getDate(1));
      days.push(getDate(2));
      days.push(getDate(3));
      days.push(getDate(4));
      days.push(getDate(5));
      days.push(getDate(6));
      console.log("days array  :: ", days);
      console.log("habits :: ", response);

      return res.render("home", { response, days });
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

function getDate(n) {
  let date = new Date();
  date.setDate(date.getDate() + n);
  let new_date = date
    .toLocaleDateString("pt-br")
    .split("/")
    .reverse()
    .join("-");
  let day = "";
  switch (date.getDay()) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }
  return { date: new_date, day };
}

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
          habit.days = 0;
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
        days: 0,
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
      dates.find(function (item) {
        console.log("found click date :: ", item);
        if (item.date === d) {
          if (item.complete === "yes") {
            item.complete = "no";
          } else if (item.complete === "no") {
            item.complete = "none";
          } else if (item.complete === "none") {
            item.complete = "yes";
            habit.days += 1;
          }
          found = true;
        }
      });
      if (!found) {
        dates.push({ date: d, complete: "yes" });
        habit.days += 1;
      }
      habit.dates = dates;
      habit
        .save()
        .then((habit) => {
          console.log("updated habit ", habit);
          res.redirect("back");
        })
        .catch((err) => console.log(err));
    }
  });
};

module.exports.removeHabit = function (req, res) {
  let id = req.query.id;
  Habit.deleteMany(
    {
      _id: id,
    },
    (error) => {
      if (error) {
        console.log("error in removing habit :: ", error);
        return;
      } else {
        console.log("successfully remove habit from DB");
        return res.redirect("back");
      }
    }
  );
};
