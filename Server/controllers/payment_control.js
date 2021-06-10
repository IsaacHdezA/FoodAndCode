const paymentModel = require("../models/payment_model.js");
const paymentControl = () => {};

paymentControl.showOrdersPerTable = (request, result) => {
	paymentModel.showOrdersPerTable([], (error, rows) => {
		if(error) result.status(500).send({ message: error });
		else result.status(200).send(rows);
	});
};

module.exports = paymentControl;