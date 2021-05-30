'use strict'
var mysql = require('mysql');
var conf = require('./dbConf.json');
var dbOptions = {
    host: conf.mysql.host,
    port: conf.mysql.port,
    user: conf.mysql.user,
    password: conf.mysql.password,
    database: conf.mysql.database
};
var myconnection = mysql.createConnection(dbOptions);
myconnection.connect((err) => {
    if (err) {
        console.log(err);
        console.log("Error a al conectar con mysql");
    }
    else {
        console.log("Se conecto con mysql");
    }
});
module.exports = myconnection;