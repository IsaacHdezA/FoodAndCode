const orderModel = require("../models/order_model.js");
const orderControl = () => {};

orderControl.allActiveOrders = (request, result) =>
  orderModel.allActiveOrders([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

orderControl.allWaitingOrders = (request, result) =>
  orderModel.allWaitingOrders([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

orderControl.allActiveEmployees = (request, result) =>
  orderModel.allActiveEmployees([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

orderControl.allActiveTables = (request, result) =>
  orderModel.allActiveTables([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

orderControl.addOrder = (request, result) => {
  const body = request.body;

  if (body.mro_id && body.mes_id) {
    orderModel.addOrder([body.mro_id, body.mes_id], (error, rows) =>
      error
        ? result.status(500).send({ message: error })
        : rows.affectedRows > 0
        ? result.status(202).send({ message: "Orden registrada" })
        : result.status(500).send({ message: "No se registró la orden" })
    );
  } else
    result
      .status(401)
      .send({ message: "Peticion de agregar orden incorrecta" });
};

orderControl.deleteOrder = (request, result) => {
  const body = request.body;

  if (body.ord_id) {
    orderModel.deleteOrder([body.ord_id], (error, rows) =>
      error
        ? result.status(500).send({ message: error })
        : rows.affectedRows > 0
        ? result.status(202).send({ message: "Orden borrada" })
        : result.status(500).send({ message: "No se borró la orden" })
    );
  } else
    result.status(401).send({ message: "Peticion de borrar orden incorrecta" });
};

module.exports = orderControl;
