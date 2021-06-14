const express = require("express");
const router = express.Router();
const tableControl = require("../controllers/table_control.js");

router.get("/allActiveTables", tableControl.allActiveTables);
router.get("/filledSpacesTables", tableControl.filledSpacesTables);
router.get("/allSuborders/:mes_id/:ord_id", tableControl.allSuborders);
router.get("/readFood", tableControl.readFood);
router.get("/ordenTable", tableControl.ordenTable);

router.post("/addSuborder", tableControl.addSuborder);
router.post("/deleteSuborder", tableControl.deleteSuborder);

module.exports = router;
