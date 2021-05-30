const conn=require('./connection2');

let mesero=()=>{};


mesero.crearNuevo=(datos,cb)=>{
     conn.query('Show tables',datos,cb);
};

module.exports=mesero;
