const tableModel = require("../models/table_model.js");
const tableControl = () => {};

tableControl.allActiveTables = (request, result) =>
  tableModel.allActiveTables([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

tableControl.filledSpacesTables = (request, result) =>
  tableModel.filledSpacesTables([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

tableControl.allSuborders = (request, result) => {
  const mes_id = request.params.mes_id;
  tableModel.allSuborders([mes_id], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );
};

tableControl.readFood = (request, result) =>
  tableModel.readFood([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

tableControl.ordenTable = (request, result) =>
  tableModel.ordenTable([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

tableControl.addSuborder = (request, result) => {
  const body = request.body;
  if (body.sub_ord_id && body.sub_com_id && body.sub_asiento && body.sub_cant) {
    tableModel.addSuborder(
      [body.sub_ord_id, body.sub_com_id, body.sub_asiento, body.sub_cant],
      (error, rows) => {
        if (error) {
          result.status(500).send({ message: error });
          console.log(error);
        } else {
          if (rows.affectedRows > 0)
            result.status(202).send({ message: "Suborden registrada" });
          else
            result.status(500).send({ message: "No se registró la suborden" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
};

tableControl.deleteSuborder = (request, result) => {
  const body = request.body;
  if (body.sub_id) {
    tableModel.deleteSuborder([body.sub_id], (error, rows) => {
      if (error) result.status(500).send({ message: error });
      else {
        if (rows.affectedRows > 0)
          result.status(202).send({ message: "Comida eliminada" });
        else result.status(500).send({ message: "No se elimino la comida" });
      }
    });
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
};

module.exports = tableControl;
