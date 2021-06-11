const connection = require("./connection.js");
const order = () => {};

order.allActiveOrders = (data, callback) =>
  connection.query(
    "SELECT o.ord_id, t.mes_id, e.mro_nombre, DATE_FORMAT(o.ord_fecha_hora, '%d/%m/%Y a las %H:%i') AS ord_fecha_hora, SUM(so.sub_cant * f.com_precio) AS ord_precio FROM orden o INNER JOIN mesero e ON(e.mro_id = o.ord_mro_id) INNER JOIN mesa t ON(t.mes_id = o.ord_mes_id) INNER JOIN suborden so ON(so.sub_ord_id = o.ord_id) INNER JOIN comida f ON(f.com_id = so.sub_com_id) WHERE o.ord_estado = 'a' GROUP BY o.ord_id ORDER BY ord_fecha_hora DESC",
    data,
    callback
  );

order.allWaitingOrders = (data, callback) =>
  connection.query(
    "SELECT o.ord_id, t.mes_id, e.mro_nombre, DATE_FORMAT(o.ord_fecha_hora, '%d/%m/%Y a las %H:%i') AS ord_fecha_hora FROM orden o INNER JOIN mesero e ON(e.mro_id = o.ord_mro_id) INNER JOIN mesa t ON(t.mes_id = o.ord_mes_id) WHERE o.ord_estado = 'w' ORDER BY ord_fecha_hora DESC",
    data,
    callback
  );

order.allActiveEmployees = (data, callback) =>
  connection.query(
    "SELECT mro_id, mro_nombre FROM mesero WHERE mro_estado = 'a' ORDER BY mro_nombre",
    data,
    callback
  );

order.allActiveTables = (data, callback) =>
  connection.query(
    "SELECT mes_id FROM mesa WHERE mes_disponible = 'a' ORDER BY mes_id",
    data,
    callback
  );

order.addOrder = (data, callback) =>
  connection.query(
    "INSERT INTO orden(ord_mro_id, ord_mes_id) VALUES(?, ?)",
    data,
    callback
  );

order.deleteOrder = (data, callback) =>
  connection.query("DELETE FROM orden WHERE ord_id = ?", data, callback);

module.exports = order;
