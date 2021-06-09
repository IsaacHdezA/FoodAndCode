const connection = require("./connection.js");

let order = () => {};

order.allOrders = (data, cb) => {
  connection.query("SELECT * FROM", data, cb);
};

order.addOrder = (data, cb) => {
  connection.query("INSERT INTO order () VALUES (?) ", data, cb);
};

module.exports = order;
