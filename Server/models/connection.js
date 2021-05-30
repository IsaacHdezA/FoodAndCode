'use strict'

const mysql = require( 'mysql' );
const conf = require( './dbConf.json' );
const { promisify } = require('util');

const dbOptions = {
    host: conf.mysql.host,
    port: conf.mysql.port,
    user: conf.mysql.user,
    password: conf.mysql.password,
    database: conf.mysql.database
};

const connection = mysql.createPool(dbOptions);

connection.getConnection(
    ( err, conn ) => {
        if( err ) console.log( "Hubo un error al conectarse a la base de datos.");
        if( conn ) console.log( "Conexión satisfactoria con la base de datos.");

        return;
    }
);

module.exports = connection;