const statisticModel = require("../models/statistic_model.js");
const statisticControl = () => {};

statisticControl.todayProfits = (request, result) => {
  const ord_fecha_hora = request.params.ord_fecha_hora;
  statisticModel.todayProfits([ord_fecha_hora], (error, rows) =>
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

statisticControl.countOrdersPerTable = (request, result) => {
  const mes_id = request.params.mes_id;
  statisticModel.countOrdersPerTable([mes_id], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.countOrdersPerEmployee = (request, result) => {
  const mro_id = request.params.mro_id;
  statisticModel.countOrdersPerEmployee([mro_id], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

statisticControl.countSalesPerDate = (request, result) => {
  const fecha_hora = request.params.fecha_hora;
  statisticModel.countSalesPerDate([fecha_hora], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

module.exports = statisticControl;
