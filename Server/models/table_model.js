const connection = require("./connection.js");
const table = () => {};

table.allActiveTables = (data, callback) =>
  connection.query(
    "SELECT m.mes_id "+
    "FROM mesa AS m "+
    "INNER JOIN orden AS o "+
    "ON (o.ord_estado ='a' OR o.ord_estado ='w' ) "+
    "AND o.ord_mes_id = m.mes_id",
    data,
    callback
  );

table.filledSpacesTables = (data, callback) =>
    connection.query(
        "SELECT m.mes_id, COUNT(DISTINCT s.sub_asiento) AS cupo "+
        "FROM mesa AS m "+
        "LEFT JOIN (SELECT s.sub_ord_id, o.ord_mes_id, s.sub_id "+
                    "FROM suborden AS s, orden  AS o "+
                    "WHERE s.sub_ord_id = o.ord_id "+
                    "AND o.ord_estado = 'a') AS r "+
            "ON m.mes_id = r.ord_mes_id "+
        "LEFT JOIN suborden AS s "+
            "ON s.sub_ord_id = r.sub_ord_id "+
            "AND s.sub_id = r.sub_id "+
        "GROUP BY m.mes_id "+
        "ORDER BY m.mes_id ASC",
        data,
        callback
    );

table.readFood = (data, callback) =>
        connection.query(
            "SELECT c.com_nombre "+
            "FROM comida AS c ",
            data,
            callback
        );

table.allSuborders = (data, callback) =>

        connection.query(
            "SELECT DISTINCT m.mes_id, s.sub_asiento, c.com_nombre, s.sub_cant, (c.com_precio*s.sub_cant) AS costo "+
            "FROM mesa AS m "+
            "LEFT JOIN (SELECT o.ord_id, m.mes_id "+
                        "FROM orden AS o, mesa AS m "+
                        "WHERE o.ord_mes_id = m.mes_id "+
                        "AND o.ord_estado = 'a' "+
                        ") AS r1 "+
                "ON m.mes_id = r1.mes_id "+
            "LEFT JOIN (SELECT s.sub_ord_id, c.com_id "+
                        "FROM suborden AS s, comida AS c "+
                        "WHERE s.sub_com_id = c.com_id "+
                        ") AS r2 "+
                "ON r1.ord_id = r2.sub_ord_id "+
            "INNER JOIN comida AS c "+
                "ON c.com_id = r2.com_id "+
            "INNER JOIN suborden AS s "+
                "ON s.sub_ord_id = r1.ord_id "+
            "WHERE m.mes_id = ?",
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
                connection.query(
                    "DELETE FROM suborden WHERE sub_id = ?",
                    data,
                    callback
                );

table.ordenTable = (data, callback) =>
                connection.query(
                  "SELECT m.mes_id, o.ord_id "+
                  "FROM mesa AS m "+
                  "LEFT JOIN orden AS o "+
                  "ON (o.ord_estado ='a' OR o.ord_estado ='w' ) "+
                  "AND o.ord_mes_id = m.mes_id "+
                  "ORDER BY m.mes_id ASC",
                  data,
                  callback
                );


module.exports = table;