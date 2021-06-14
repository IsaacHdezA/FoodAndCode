const connection = require("./connection.js");
const table = () => {};

table.allActiveTables = (data, callback) =>
  connection.query(
    "SELECT m.mes_id " +
      "FROM mesa AS m " +
      "INNER JOIN orden AS o " +
      "ON (o.ord_estado ='a' OR o.ord_estado ='w' ) " +
      "AND o.ord_mes_id = m.mes_id",
    data,
    callback
  );

table.filledSpacesTables = (data, callback) =>
  connection.query(
    "SELECT m.mes_id, COUNT(DISTINCT s.sub_asiento) AS cupo " +
      "FROM mesa AS m " +
      "LEFT JOIN (SELECT s.sub_ord_id, o.ord_mes_id, s.sub_id " +
      "FROM suborden AS s, orden  AS o " +
      "WHERE s.sub_ord_id = o.ord_id " +
      "AND o.ord_estado = 'a') AS r " +
      "ON m.mes_id = r.ord_mes_id " +
      "LEFT JOIN suborden AS s " +
      "ON s.sub_ord_id = r.sub_ord_id " +
      "AND s.sub_id = r.sub_id " +
      "GROUP BY m.mes_id " +
      "ORDER BY m.mes_id ASC",
    data,
    callback
  );

table.allSuborders = (data, callback) =>
  connection.query(
    "SELECT so.sub_id, so.sub_asiento, f.com_nombre, so.sub_cant, (f.com_precio * so.sub_cant) AS sub_precio FROM suborden so INNER JOIN comida f ON(so.sub_com_id = f.com_id) INNER JOIN orden o ON(o.ord_id = so.sub_ord_id) INNER JOIN mesa t ON(t.mes_id = o.ord_mes_id) WHERE t.mes_id = ? AND o.ord_id = ? ORDER BY so.sub_asiento",
    data,
    callback
  );

table.readFood = (data, callback) =>
  connection.query(
    "SELECT c.com_nombre " + "FROM comida AS c ",
    data,
    callback
  );

table.ordenTable = (data, callback) =>
  connection.query(
    "SELECT m.mes_id, o.ord_id " +
      "FROM mesa AS m " +
      "LEFT JOIN orden AS o " +
      "ON (o.ord_estado ='a' OR o.ord_estado ='w' ) " +
      "AND o.ord_mes_id = m.mes_id " +
      "ORDER BY m.mes_id ASC",
    data,
    callback
  );

table.addSuborder = (data, callback) =>
  connection.query(
    "INSERT INTO suborden(sub_ord_id, sub_com_id, sub_asiento, sub_cant) VALUES (?, ?, ?, ?)",
    data,
    callback
  );

table.deleteSuborder = (data, callback) =>
  connection.query("DELETE FROM suborden WHERE sub_id = ?", data, callback);

module.exports = table;
