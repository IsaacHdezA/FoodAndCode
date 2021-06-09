const connection = require("./connection.js");

let order = () => {};

order.allOrders = (data, callback) => {
  connection.query("SELECT * FROM", data, callback);
};

order.addOrder = (data, callback) => {
  connection.query("INSERT INTO order () VALUES (?) ", data, callback);
};

module.exports = order;
