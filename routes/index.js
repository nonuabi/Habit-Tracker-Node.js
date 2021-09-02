const express = require("express");
const router = express.Router();
const homeController = require("../controller/home_controller");
router.get("/", homeController.home);
router.post("/new-habit", homeController.newHabit);
router.get("/update-status", homeController.statesChange);

module.exports = router;
