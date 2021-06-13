const express = require("express");
const router = express.Router();
const statisticControl = require("../controllers/statistic_control.js");

router.get("/todayProfit/:fecha", statisticControl.todayProfit);
router.get("/monthProfits", statisticControl.monthProfits);
router.get(
  "/allOrdersPerDate:ord_fecha_hora",
  statisticControl.allOrdersPerDate
);
router.get(
  "/countOrdersPerTable/:mes_id",
  statisticControl.countOrdersPerTable
);
router.get(
  "/countOrdersPerEmployee/:mro_id",
  statisticControl.countOrdersPerEmployee
);
router.get("/countSalesPerDate/:fecha", statisticControl.countSalesPerDate);

module.exports = router;
