const express = require("express");
const router = express.Router();
const category_control = require("../controllers/category_control.js");

router.get("/all_categories", category_control.all_categories);
router.post("/new_category", category_control.new_category);
router.post("/delete_category", category_control.delete_category);

module.exports = router;
