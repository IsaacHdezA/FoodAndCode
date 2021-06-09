const conn=require('./connection');

let comida = () => {};


comida.agregar_nuevo = (datos,cb) => {
     conn.query('INSERT INTO comida(com_id_categoria, com_nombre, com_precio, com_descripcion) VALUES (?,?,?,?);',
     datos,cb);
};

comida.seleccionar_todos = (datos,cb) => {
     conn.query("SELECT * FROM comida;",[],cb);
};

module.exports = comida;
