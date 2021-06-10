const app = require("./app");
var http = require("http").Server(app);
const PORT = process.env.PORT || 3000; // Elige un puerto al azar si no puede escuchar el que se puso.

http.listen(PORT, (err) =>
  err
    ? console.log("Hubo un error")
    : console.log(`La api esta corriendo en puerto ${PORT}`)
);
