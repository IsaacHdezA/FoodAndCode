const paymentModel = require("../models/payment_model.js");
const paymentControl = () => {};

paymentControl.showOrdersPerTable = (request, result) => {
	const body = request.body;
		paymentModel.showOrdersPerTable([25], (error, rows) => {
			if(error) result.status(500).send({ message: error });
			else result.status(200).send(rows);
		});
};

paymentControl.orderTotal = (request, result) => {
	const body = request.body;
		paymentModel.orderTotal([25], (error, rows) => {
			if(error) result.status(500).send({ message: error });
			else result.status(200).send(rows);
		});
};

module.exports = paymentControl;