const express = require("express");
const router = express.Router();
const paymentControl = require("../controllers/payment_control.js");

router.get("/orderPerTable", paymentControl.showOrdersPerTable);

module.exports = router;