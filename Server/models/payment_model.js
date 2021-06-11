const connection = require("./connection.js");
const payment = () => {};

payment.showAllPayments = (datos, cb) => {
	connection.query("SELECT * FROM pago;", [], cb);
};

payment.showOrdersPerTable = (datos, cb) => {
	connection.query("SELECT com.com_nombre, SUM(sub_cant) AS cant_total_comida, (SUM(sub_cant)*com.com_precio) AS total_neto \
				FROM suborden sub\
				INNER JOIN comida com ON com.com_id = sub_com_id\
				WHERE sub.sub_ord_id = ?\
				GROUP BY sub.sub_com_id;", datos, cb);
};

payment.orderTotal = (datos, cb) => {
	connection.query("SELECT SUM(subq.total_neto) AS total_orden\
	   			FROM (SELECT (SUM(sub_cant)*com.com_precio) AS total_neto\
			        	FROM suborden sub\
			        	INNER JOIN comida com ON com.com_id = sub_com_id\
			        	WHERE sub.sub_ord_id = ?\
			        	GROUP BY sub.sub_com_id) subq;", datos, cb);
};

payment.insertPayment = (datos, cb) => {
	connection.query("INSERT INTO pago(pag_ord_id, pag_subtotal, pag_total, pag_propina )\
			     VALUES (?, (SELECT SUM(subq.total_neto) AS subtotal_orden\
			     		   FROM (SELECT com.com_nombre, SUM(sub_cant) AS cant_total_comida, (SUM(sub_cant)*com.com_precio) AS total_neto\
			     				FROM suborden sub\
			     				INNER JOIN comida com ON com.com_id = sub_com_id\
			     				WHERE sub.sub_ord_id = ?\
			     				GROUP BY sub.sub_com_id) subq),\
			     	        (SELECT (SUM(subq.total_neto) + 0.10*SUM(subq.total_neto)) AS total_orden\
			     		   FROM (SELECT com.com_nombre, SUM(sub_cant) AS cant_total_comida, (SUM(sub_cant)*com.com_precio) AS total_neto\
			     			 FROM suborden sub\
			     				INNER JOIN comida com ON com.com_id = sub_com_id\
			     				WHERE sub.sub_ord_id = ?\
			     				GROUP BY sub.sub_com_id) subq), ?, ?);", datos, cb);
};

module.exports = payment;