const express = require("express");
const router = express.Router();
const homeController = require("../controller/home_controller");
// routers
router.get("/", homeController.welcome);
router.post("/new-habit", homeController.newHabit);
router.get("/update-status", homeController.statesChange);
router.get("/remove-habit", homeController.removeHabit);
router.get("/home", homeController.home);
router.get("/login", homeController.login);
router.post("/handle-view", homeController.handleView);
module.exports = router;
