var food_model = require("../models/food_model.js");
var food_control = () => {};

food_control.all_food = (request, result) => {
  food_model.all_food([], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

food_control.new_food= (request, result) => {
  const body = request.body;
  if (
    body.com_id_categoria &&
    body.com_nombre &&
    body.com_precio &&
    body.com_descripcion
  ) {  // VALIDACION DE DATOS
    food_model.new_food(
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

food_control.delete_food = (request, result) => {
  const body = request.body;
  if (body.com_id) { // VALIDACIÓN DE DATOS
    food_model.delete_food([body.com_id],
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
}

module.exports = food_control;
