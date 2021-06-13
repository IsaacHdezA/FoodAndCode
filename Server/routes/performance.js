const express = require("express");
const router = express.Router();
let conn = require("../models/connection");

router.get("/shutdown", (req, res) => {
  conn.end();
  res.status(200).send("Se cerro la conexion");
});

module.exports = router;
