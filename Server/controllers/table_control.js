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


module.exports = tableControl;