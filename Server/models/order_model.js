const connection = require("./connection.js");
const order = () => {};

order.allOrders = (data, callback) => {
  connection.query(
    "SELECT t.ord_mes_id, e.mro_nombre, o.ord_fecha_hora, o.ord_estado, SUM(so.sub_cant * f.com_precio) FROM orden o INNER JOIN mesero e ON(e.mro_id = o.ord_mro_id) INNER JOIN mesa t ON(t.mes_id = o.ord_mes_id) INNER JOIN suborden so ON(so.sub_ord_id = o.ord_id) INNER JOIN comida f ON(f.com_id = so.sub_com_id)",
    data,
    callback
  );
};

order.allEmployees = (data, callback) => {
  connection.query(
    "SELECT mro_id, mro_nombre FROM mesero WHERE mro_estado = 'a'",
    data,
    callback
  );
};

order.allTables = (data, callback) => {
  connection.query(
    "SELECT mes_id FROM mesa WHERE mes_disponible = 'a'",
    data,
    callback
  );
};

order.addOrder = (data, callback) => {
  connection.query(
    "INSERT INTO orden(ord_mro_id, ord_mes_id) VALUES(?, ?)",
    data,
    callback
  );
};

module.exports = order;
