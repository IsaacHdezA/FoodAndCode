const app = require('./app');
var http = require('http').Server(app);
const PORT = 3001 || process.env.PORT;// Elige un puerto al azar si no puede escuchar el que se puso.

http.listen( PORT, (err) => {
    if(err) console.log("Hubo un error");
    else console.log(`La api esta corriendo en puerto ${PORT}`);
});