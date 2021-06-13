var food_model = require("../models/food_model.js");
var food_control = () => {};

food_control.all_foods = (request, result) => {
  food_model.all_foods([], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

food_control.new_food= (request, result) => {
  const body = request.body;
  if (
    body.com_cat_id &&
    body.com_nombre &&
    body.com_precio &&
    body.com_descripcion
  ) {  // VALIDACION DE DATOS
    food_model.new_food(
      [
        body.com_cat_id,
        body.com_nombre,
        body.com_precio,
        body.com_descripcion,
      ],
      (error, rows) => {
        if (error) {
          result.status(500).send({ message: error });
        }
        else {
          if (rows.affectedRows > 0)
            result.status(202).send({ message: "Comida registrada" });
          else result.status(500).send({ message: "No se registró la comida" });
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
            result.status(202).send({ message: "Comida registrada" });
          else result.status(500).send({ message: "No se registró la comida" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
}

food_control.update_food = (request, result) => {
  const body = request.body;
  if (
    body.com_id &&
    body.com_cat_id&&
    body.com_nombre &&
    body.com_precio &&
    body.com_descripcion
  ) {  // VALIDACION DE DATOS
    food_model.update_food(
      [
        body.com_cat_id,
        body.com_nombre,
        body.com_precio,
        body.com_descripcion,
        body.com_id,
      ],
      (error, rows) => {
        if (error) result.status(500).send({ message: error });
        else {
          if (rows.affectedRows > 0)
            result.status(202).send({ message: "Comida actualizada" });
          else result.status(500).send({ message: "No se actualizo la comida" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS

}

food_control.active_food = (request, result) => {
  const body = request.body;
  if (body.com_id) {
    food_model.active_food(
      [
        body.com_id,
      ],
      (error, rows) => {
        if (error) result.status(500).send({ message: error });
        else {
          if (rows.affectedRows > 0)
            result.status(202).send({ message: "Comida activada." });
          else result.status(500).send({ message: "No se activo la comida" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
}

food_control.inactive_food = (request, result) => {
  const body = request.body;
  if (body.com_id) {
    food_model.inactive_food(
      [
        body.com_id,
      ],
      (error, rows) => {
        if (error) result.status(500).send({ message: error });
        else {
          if (rows.affectedRows > 0)
            result.status(202).send({ message: "Comida habilitada" });
          else result.status(500).send({ message: "No se deshabilito la comida" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
}



module.exports = food_control;
