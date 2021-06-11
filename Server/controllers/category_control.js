var category_model = require("../models/category_model.js");
var category_control = () => {};

category_control.all_categories = (request, result) => {
  category_model.all_categories([], (error, rows) => {
    if (error) result.status(500).send({ message: error });
    else result.status(200).send(rows);
  });
};

category_control.new_category= (request, result) => {
  const body = request.body;
  if (
    body.com_id_categoria &&
    body.com_nombre &&
    body.com_precio &&
    body.com_descripcion
  ) {  // VALIDACION DE DATOS
    category_model.new_category(
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
            result.status(202).send({ message: "Categoria registrada" });
          else result.status(500).send({ message: "No se registró la categoria" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
};

category_control.delete_category = (request, result) => {
  const body = request.body;
  if (body.com_id) { // VALIDACIÓN DE DATOS
    category_model.delete_category([body.com_id],
      (error, rows) => {
        if (error) result.status(500).send({ message: error });
        else {
          if (rows.affectedRows > 0)
            result.status(202).send({ message: "Categoria registrada" });
          else result.status(500).send({ message: "No se registró la categoria" });
        }
      }
    );
  } else result.status(401).send({ message: "Peticion incorrecta" }); // VALIDACION DE DATOS
}

module.exports = category_control;
