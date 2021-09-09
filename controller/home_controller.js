const { response } = require("express");
const Habit = require("../models/habit");
const User = require("../models/user");

module.exports.welcome = function (req, res) {
  // rendering the login.ejs file
  return res.render("login");
};

module.exports.login = function (req, res) {
  User.find({ Name: "John" }).then((response) => {
    // find user
    if (response.length > 0) {
      console.log("user response :: ", response);
      return res.redirect("/home");
    } else {
      // creating user
      const new_user = new User({ Name: "John", View: "daily" });
      new_user
        .save()
        .then((response) => {
          console.log("After saving new User :: ", response);
          return res.redirect("/home");
        })
        .catch((err) => {
          console.log("after saving error :: ", err);
          return;
        });
    }
  });
};
module.exports.home = function (req, res) {
  User.find({ Name: "John" }).then((user) => {
    Habit.find({}, (err, habit) => {
      if (err) {
        console.log("Error while finding habits :: ", err);
      } else {
        // storing upcomming 7 days
        let days = [];
        days.push(getDate(0));
        days.push(getDate(1));
        days.push(getDate(2));
        days.push(getDate(3));
        days.push(getDate(4));
        days.push(getDate(5));
        days.push(getDate(6));
        // sending data to home.ejs file
        return res.render("home", { habit, days, user });
      }
    });
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

// handle view of user
module.exports.handleView = function (req, res) {
  User.find({ Name: "John" }).then((user) => {
    // changing user view
    user[0].View = user[0].View === "daily" ? "Weekly" : "daily";
    console.log("changes user view :: ", user[0]);
    user[0]
      .save()
      .then((user) => {
        console.log("change view User :: ", user);
        res.redirect("back");
      })
      .catch((err) => {
        console.log("error while changing view of the user :: ", err);
        return;
      });
  });
};

// add new habit
module.exports.newHabit = function (req, res) {
  console.log(req.body);
  const { content } = req.body;

  Habit.findOne({ content: content }).then((habit) => {
    if (habit) {
      // updating existing habits
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

      // save habit
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

// toggle between status
module.exports.statesChange = function (req, res) {
  var d = req.query.date;
  var id = req.query.id;
  Habit.findById(id, (err, habit) => {
    if (err) {
      console.log("Error updating status!");
    } else {
      let dates = habit.dates;
      let found = false;
      // changing specify date status
      dates.find(function (item) {
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
      // save habit
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

// removing habit
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
