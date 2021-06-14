const connection = require("./connection.js");
const statistic = () => {};

statistic.todayProfit = (data, callback) =>
  connection.query(
    "SELECT DATE_FORMAT(pag_fecha_pago, '%Y-%m-%d') AS pag_ganancia_fecha, SUM(pag_total) AS pag_ganancia FROM pago GROUP BY pag_ganancia_fecha HAVING pag_ganancia_fecha = ?",
    data,
    callback
  );

statistic.monthProfits = (data, callback) =>
  connection.query(
    "SELECT DATE_FORMAT(pag_fecha_pago, '%m') AS pag_ganancia_mes, SUM(pag_total) AS pag_ganancia FROM pago GROUP BY pag_ganancia_mes ORDER BY pag_ganancia_mes",
    data,
    callback
  );

statistic.allOrdersPerDate = (data, callback) =>
  connection.query(
    "SELECT o.ord_id, t.mes_id, e.mro_nombre, o.ord_estado FROM orden o INNER JOIN mesero e ON(e.mro_id = o.ord_mro_id) INNER JOIN mesa t ON(t.mes_id = o.ord_mes_id) WHERE DATE_FORMAT(o.ord_fecha_hora, '%Y-%m-%d') = ? ORDER BY ord_fecha_hora DESC",
    data,
    callback
  );

statistic.allOrdersPerTable = (data, callback) =>
  connection.query(
    "SELECT o.ord_id, t.mes_id, e.mro_nombre, DATE_FORMAT(o.ord_fecha_hora, '%H:%i') AS ord_fecha_hora, o.ord_estado FROM orden o INNER JOIN mesero e ON(e.mro_id = o.ord_mro_id) INNER JOIN mesa t ON(t.mes_id = o.ord_mes_id) WHERE o.ord_mes_id = ? AND DATE_FORMAT(o.ord_fecha_hora, '%Y-%m-%d') = ? ORDER BY ord_fecha_hora DESC",
    data,
    callback
  );

statistic.allOrdersPerEmployee = (data, callback) =>
  connection.query(
    "SELECT o.ord_id, t.mes_id, e.mro_nombre, DATE_FORMAT(o.ord_fecha_hora, '%H:%i') AS ord_fecha_hora, o.ord_estado FROM orden o INNER JOIN mesero e ON(e.mro_id = o.ord_mro_id) INNER JOIN mesa t ON(t.mes_id = o.ord_mes_id) WHERE o.ord_mro_id = ? AND DATE_FORMAT(o.ord_fecha_hora, '%Y-%m-%d') = ? ORDER BY ord_fecha_hora DESC",
    data,
    callback
  );

statistic.countOrdersPerTable = (data, callback) =>
  connection.query(
    "SELECT COUNT(*) AS nOrdersPerTable FROM orden WHERE ord_mes_id = ? AND DATE_FORMAT(ord_fecha_hora, '%Y-%m-%d') = ?",
    data,
    callback
  );

statistic.countOrdersPerEmployee = (data, callback) =>
  connection.query(
    "SELECT COUNT(*) AS nOrdersPerEmployee FROM orden WHERE ord_mro_id = ? AND DATE_FORMAT(ord_fecha_hora, '%Y-%m-%d') = ?",
    data,
    callback
  );

statistic.countSalesPerDate = (data, callback) =>
  connection.query(
    "SELECT COUNT(*) AS nSalesPerDate FROM pago WHERE DATE_FORMAT(pag_fecha_pago, '%Y-%m-%d') = ?",
    data,
    callback
  );

statistic.allTables = (data, callback) =>
  connection.query("SELECT mes_id FROM mesa ORDER BY mes_id", data, callback);

statistic.allEmployees = (data, callback) =>
  connection.query(
    "SELECT mro_id, mro_nombre FROM mesero ORDER BY mro_nombre",
    data,
    callback
  );

module.exports = statistic;
