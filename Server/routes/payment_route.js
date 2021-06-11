const express = require("express");
const router = express.Router();
const paymentControl = require("../controllers/payment_control.js");

router.get("/showAllPayments", paymentControl.showAllPayments);
router.get(
  "/showOrdersPerTable/:sub_ord_id",
  paymentControl.showOrdersPerTable
);
router.get("/orderPerTable", paymentControl.showOrdersPerTable);
router.get("/orderTotal", paymentControl.orderTotal);
router.post("/insertPayment", paymentControl.insertPayment);

module.exports = router;
