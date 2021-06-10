var express = require("express");
var path = require("path");
var morgan = require("morgan");
var cors = require("cors");
var app = express();

var mesero_ruta = require("./routes/mesero_ruta");
var comida_ruta = require("./routes/comida_ruta");
var order_route = require("./routes/order_route.js");

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/mesero", mesero_ruta);
app.use("/comida", comida_ruta);
app.use("/orders", order_route);

app.get("/favicon.ico", (req, res) => res.status(204));

module.exports = app;
