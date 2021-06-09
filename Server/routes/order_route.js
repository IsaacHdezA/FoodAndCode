const express = require("express");
const router = express.Router();
const orderControl = require("../controllers/orden_control.js");

router.get("/allOrders", orderControl.allOrders);
router.post("/addOrder", orderControl.addOrder);

module.exports = router;