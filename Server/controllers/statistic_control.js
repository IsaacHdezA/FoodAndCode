const statisticModel = require("../models/statistic_model.js");
const statisticControl = () => {};

statisticControl.todayProfit = (request, result) => {
  const fecha = request.params.fecha;
  statisticModel.todayProfit([fecha], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );
};

statisticControl.monthProfits = (request, result) =>
  statisticModel.monthProfits([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

statisticControl.allOrdersPerDate = (request, result) => {
  const ord_fecha_hora = request.params.ord_fecha_hora;
  statisticModel.allOrdersPerDate([ord_fecha_hora], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.allOrdersPerTable = (request, result) => {
  const mes_id = request.params.mes_id,
    fecha = request.params.fecha;
  statisticModel.allOrdersPerTable([mes_id, fecha], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.allOrdersPerEmployee = (request, result) => {
  const mro_id = request.params.mro_id,
    fecha = request.params.fecha;
  statisticModel.allOrdersPerEmployee([mro_id, fecha], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.countOrdersPerTable = (request, result) => {
  const mes_id = request.params.mes_id,
    fecha = request.params.fecha;
  statisticModel.countOrdersPerTable([mes_id, fecha], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.countOrdersPerEmployee = (request, result) => {
  const mro_id = request.params.mro_id,
    fecha = request.params.fecha;
  statisticModel.countOrdersPerEmployee([mro_id, fecha], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.countSalesPerDate = (request, result) => {
  const fecha = request.params.fecha;
  statisticModel.countSalesPerDate([fecha], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.allTables = (request, result) => {
  statisticModel.allTables([], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.allEmployees = (request, result) => {
  statisticModel.allEmployees([], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

module.exports = statisticControl;
