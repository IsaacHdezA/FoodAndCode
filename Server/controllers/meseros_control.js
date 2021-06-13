var mesero = require("../models/meseros");

var mesero_control = () => {};

mesero_control.nuevo = (req, res) => {
  console.log(req.file.filename);
  let body = req.body;
  console.log(body);
  if (
    body.mro_nombre &&
    body.mro_telefono &&
    body.mro_correo &&
    body.mro_sueldo &&
    body.mro_domicilio
  ) {
    mesero.crearNuevo(
      [
        body.mro_nombre,
        body.mro_telefono,
        body.mro_correo,
        body.mro_sueldo,
        body.mro_domicilio,
        req.file.filename,
      ],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send({message: err});
        } else {
          if (rows.affectedRows > 0) {
            res.status(202).send({message: "Se registro el nuevo mesero"});
          } else {
            console.log(rows);
            res.status(500).send({message: "No se registro el mesero"});
          }
        }
      }
    );
  } else {
    res.status(401).send({message: "Peticion incorrecta"});
  }
};

mesero_control.seleccionarTodos = (req, res) => {
  mesero.seleccionarTodos([], (err, rows) => {
    if (err) {
      res.status(500).send({message: err});
    } else {
      res.status(200).send(rows);
    }
  });
};

mesero_control.cambiarEstado = (req, res) => {
  let body = req.body;

  if (body.mro_estado && body.mro_id) {
    mesero.cambiarEstado([body.mro_estado, body.mro_id], (err, rows) => {
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (rows.affectedRows > 0) {
          res.status(200).send({message: "Todo ok"});
        } else {
          res.status(500).send({message: "Error"});
        }
      }
    });
  } else {
    res.status(400).send({message: "Peticion incorrecta"});
  }
};
mesero_control.actualizar = (req, res) => {
  console.log(req);
  let body = req.body;

  if (
    body.mro_nombre &&
    body.mro_telefono &&
    body.mro_correo &&
    body.mro_sueldo &&
    body.mro_domicilio &&
    body.mro_estado
  ) {
    mesero.actualizar(
      [
        body.mro_nombre,
        body.mro_telefono,
        body.mro_correo,
        body.mro_sueldo,
        body.mro_domicilio,
        body.mro_estado,
        req.file.filename,
        body.mro_id,
      ],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send({message: err});
        } else {
          if (rows.affectedRows > 0) {
            res.status(202).send({message: "Se actualizo"});
          } else {
            console.log(rows);
            res.status(500).send({message: "No se registro el mesero"});
          }
        }
      }
    );
  } else {
    res.status(401).send({message: "Peticion incorrecta"});
  }
};

mesero_control.actualizars = (req, res) => {
  let body = req.body;
  if (
    body.mro_nombre &&
    body.mro_telefono &&
    body.mro_correo &&
    body.mro_sueldo &&
    body.mro_domicilio &&
    body.mro_estado &&
    body.mro_foto
  ) {
    mesero.actualizar(
      [
        body.mro_nombre,
        body.mro_telefono,
        body.mro_correo,
        body.mro_sueldo,
        body.mro_domicilio,
        body.mro_estado,
        body.mro_foto,
        body.mro_id,
      ],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send({message: err});
        } else {
          if (rows.affectedRows > 0) {
            res.status(202).send({message: "Se actualizo"});
          } else {
            console.log(rows);
            res.status(500).send({message: "No se registro el mesero"});
          }
        }
      }
    );
  } else {
    res.status(401).send({message: "Peticion incorrecta"});
  }
};
module.exports = mesero_control;
