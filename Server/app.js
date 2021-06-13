const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const mesero_ruta = require("./routes/mesero_ruta");
const food_route = require("./routes/food_route");
const category_route = require("./routes/category_route");
const order_route = require("./routes/order_route.js");
const payment_route = require("./routes/payment_route.js");
const table_route = require("./routes/table_route.js");
const statistic_route = require("./routes/statistic_route.js");
const performance_route = require("./routes/performance");

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "uploads")));

app.use("/mesero", mesero_ruta);
app.use("/food", food_route);
app.use("/category", category_route);
app.use("/order", order_route);
app.use("/payment", payment_route);
app.use("/table", table_route);
app.use("/statistic", statistic_route);
app.use("/sever", performance_route);
app.get("/favicon.ico", (req, res) => res.status(204));

module.exports = app;
