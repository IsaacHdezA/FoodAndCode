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
    "SELECT * FROM orden WHERE DATE_FORMAT(ord_fecha_hora, '%Y-%m-%d') = ?",
    data,
    callback
  );

statistic.countOrdersPerTable = (data, callback) =>
  connection.query(
    "SELECT COUNT(*) AS nOrdersPerTable FROM order WHERE ord_mes_id = ?",
    data,
    callback
  );

statistic.countOrdersPerEmployee = (data, callback) =>
  connection.query(
    "SELECT COUNT(*) AS nOrdersPerEmployee FROM order WHERE ord_mro_id = ?",
    data,
    callback
  );

statistic.countSalesPerDate = (data, callback) =>
  connection.query(
    "SELECT COUNT(*) AS nSalesPerDate FROM pago WHERE DATE_FORMAT(pag_fecha_pago, '%Y-%m-%d') = ?",
    data,
    callback
  );

module.exports = statistic;
