const paymentModel = require("../models/payment_model.js");
const paymentControl = () => {};

paymentControl.showAllPayments = (request, result) => {
  paymentModel.showAllPayments([], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

paymentControl.showOrdersPerTable = (request, result) => {
  const sub_ord_id = request.params.sub_ord_id;
  paymentModel.showOrdersPerTable([sub_ord_id], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

paymentControl.orderTotal = (request, result) => {
  const body = request.body;
  paymentModel.orderTotal([body.sub_ord_id], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

paymentControl.insertPayment = (request, result) => {
  const body = request.body;
  paymentModel.insertPayment(
    [
      body.pag_ord_id,
      body.pag_ord_id,
      body.pag_ord_id,
      body.pag_propina,
      body.pag_tipo_pago,
    ],
    (error, rows) => {
      if (error) result.status(500).send({ message: error });
      else result.status(200).send(rows);
    }
  );
};

module.exports = paymentControl;
