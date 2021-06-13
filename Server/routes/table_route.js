const express = require("express");
const router = express.Router();
const tableControl = require("../controllers/table_control.js");

router.get("/allActiveTables", tableControl.allActiveTables);
router.get("/filledSpacesTables", tableControl.filledSpacesTables);

router.get("/allSuborders", tableControl.allSuborders);

module.exports = router;