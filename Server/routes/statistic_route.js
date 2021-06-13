const express = require("express");
const router = express.Router();
const statisticControl = require("../controllers/statistic_control.js");

router.get("/todayProfits", statisticControl.todayProfits);
router.get("/monthProfits", statisticControl.monthProfits);
router.get("/allOrdersPerDate", statisticControl.allOrdersPerDate);
router.get("/countOrdersPerTable", statisticControl.countOrdersPerTable);
router.get("/countOrdersPerEmployee", statisticControl.countOrdersPerEmployee);
router.get("/countSalesPerDate", statisticControl.countSalesPerDate);

module.exports = router;
