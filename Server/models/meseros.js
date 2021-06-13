const mesero_control = require("../controllers/meseros_control");
const conn = require("./connection");

let mesero = () => {};

mesero.crearNuevo = (datos, cb) => {
  conn.query(
    "INSERT INTO mesero (mro_nombre,mro_telefono,mro_correo,mro_sueldo,mro_domicilio, mro_foto) VALUES (?,?,?,?,?,?) ",
    datos,
    cb
  );
};

mesero.seleccionarTodos = (datos, cb) => {
  conn.query("SELECT * FROM mesero", [], cb);
};

mesero.cambiarEstado = (datos, cb) => {
  conn.query("UPDATE mesero SET mro_estado=? WHERE mro_id=?", datos, cb);
};

mesero.actualizar = (datos, cb) => {
  conn.query(
    "UPDATE mesero SET mro_nombre=?,mro_telefono=?,mro_correo=?, mro_sueldo=?,mro_domicilio=?,mro_estado=?,mro_foto=? WHERE mro_id=?",
    datos,
    cb
  );
};

module.exports = mesero;
