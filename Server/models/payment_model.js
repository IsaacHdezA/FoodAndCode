const connection = require("./connection.js");
const payment = () => {};

payment.showOrdersPerTable = (datos, cb) => {
	connection.query("SELECT com.com_nombre, SUM(sub_cant) AS cant_total_comida, (SUM(sub_cant)*com.com_precio) AS total_neto \
				FROM suborden sub\
				INNER JOIN comida com ON com.com_id = sub_com_id\
				WHERE sub.sub_ord_id = 25\
				GROUP BY sub.sub_com_id;", datos, cb);
};

module.exports = payment;