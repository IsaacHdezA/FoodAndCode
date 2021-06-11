const express = require("express");
const router = express.Router();
const orderControl = require("../controllers/order_control.js");

router.get("/allActiveOrders", orderControl.allActiveOrders);
router.get("/allWaitingOrders", orderControl.allWaitingOrders);
router.get("/allActiveEmployees", orderControl.allActiveEmployees);
router.get("/allActiveTables", orderControl.allActiveTables);
router.post("/addOrder", orderControl.addOrder);
router.post("/deleteOrder", orderControl.deleteOrder);
router.post("/activateTable", orderControl.activateTable);
router.post("/desactivateTable", orderControl.desactivateTable);

module.exports = router;
