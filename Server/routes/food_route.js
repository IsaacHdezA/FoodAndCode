const express = require("express");
const router = express.Router();
const food_control = require("../controllers/food_control.js");

router.get("/all_food", food_control.all_food);
router.post("/new_food", food_control.new_food);
router.post("/delete_food", food_control.delete_food);

module.exports = router;
