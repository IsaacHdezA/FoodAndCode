var comida_model = require("../models/comida_model.js");
var comida_control = () => {};

comida_control.seleccionar_todos = (request, result) => {
  comida_model.seleccionar_todos([], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

comida_control.agregar_nuevo = (request, result) => {
  const body = request.body;
  if (
    body.com_id_categoria &&
    body.com_nombre &&
    body.com_precio &&
    body.com_descripcion
  ) {  // VALIDACION DE DATOS
    comida_model.agregar_nuevo(
      [
        body.com_id_categoria,
        body.com_nombre,
        body.com_precio,
        body.com_descripcion,
      ],
      (error, rows) => {
        if (error) result.status(500).send({ message: error });
        else {
          if (rows.affectedRows > 0)
            result.status(202).send({ message: "Orden registrada" });
          else result.status(500).send({ message: "No se registró la orden" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
};

module.exports = comida_control;
