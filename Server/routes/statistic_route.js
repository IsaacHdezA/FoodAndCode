const express = require("express");
const router = express.Router();
const statisticControl = require("../controllers/statistic_control.js");

router.get("/todayProfit/:fecha", statisticControl.todayProfit);
router.get("/monthProfits", statisticControl.monthProfits);
router.get(
  "/allOrdersPerDate/:ord_fecha_hora",
  statisticControl.allOrdersPerDate
);
router.get(
  "/allOrdersPerTable/:mes_id/:fecha",
  statisticControl.allOrdersPerTable
);
router.get(
  "/allOrdersPerEmployee/:mro_id/:fecha",
  statisticControl.allOrdersPerEmployee
);
router.get(
  "/countOrdersPerTable/:mes_id/:fecha",
  statisticControl.countOrdersPerTable
);
router.get(
  "/countOrdersPerEmployee/:mro_id/:fecha",
  statisticControl.countOrdersPerEmployee
);
router.get("/countSalesPerDate/:fecha", statisticControl.countSalesPerDate);
router.get("/allTables/", statisticControl.allTables);
router.get("/allEmployees/", statisticControl.allEmployees);

module.exports = router;
