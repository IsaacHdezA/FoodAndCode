var express = require('express');
var router=express.Router();
var mesero_control=require('../controllers/meseros_control');


router.get("/nuevo:mensaje",mesero_control.nuevo);

module.exports=router;