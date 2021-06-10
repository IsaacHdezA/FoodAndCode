const express = require("express");
const router = express.Router();
const orderControl = require("../controllers/order_control.js");

router.get("/allOrders", orderControl.allOrders);
router.get("/allActiveEmployees", orderControl.allActiveEmployees);
router.get("/allActiveTables", orderControl.allActiveTables);
router.post("/addOrder", orderControl.addOrder);

module.exports = router;
