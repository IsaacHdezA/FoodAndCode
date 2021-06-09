const express = require("express");
const router = express.Router();
const comida_control = require("../controllers/comida_control.js");

router.get("/menu", comida_control.seleccionar_todos);
router.post("/nuevo_platillo", comida_control.agregar_nuevo);

module.exports = router;
