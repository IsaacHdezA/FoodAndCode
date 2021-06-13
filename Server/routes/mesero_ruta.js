var express = require("express");
var router = express.Router();
var mesero_control = require("../controllers/meseros_control");
var path = require("path");
var multer = require("multer");
const mesero = require("../models/meseros");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var uploadS = multer({storage: storage}).single("file");

router.post("/nuevo", uploadS, mesero_control.nuevo);
router.get("/seleccionarTodos", mesero_control.seleccionarTodos);
router.put("/cambiarEstado", mesero_control.cambiarEstado);
router.put("/actualizar", uploadS, mesero_control.actualizar);
router.put("/actualizars", mesero_control.actualizars);

module.exports = router;
