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

  tableControl.allSuborders = (request, result) =>
  tableModel.allSuborders([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

  tableControl.readFood = (request, result) =>
  tableModel.readFood([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

  tableControl.addSuborder = (request, result) =>
  tableModel.addSuborder([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

  tableControl.deleteSuborder = (request, result) =>
  tableModel.deleteSuborder([], (error, rows) =>
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

module.exports = tableControl;