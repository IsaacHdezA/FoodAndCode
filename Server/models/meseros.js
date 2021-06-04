const conn=require('./connection2');

let mesero=()=>{};


mesero.crearNuevo=(datos,cb)=>{
     conn.query('INSERT INTO mesero (mro_nombre,mro_telefono,mro_correo,mro_sueldo,mro_domicilio, mro_foto) VALUES (?,?,?,?,?,?) ',
     datos,cb);
};

mesero.seleccionarTodos=(datos,cb)=>{
     conn.query("SELECT * FROM mesero",[],cb);
};
module.exports=mesero;
