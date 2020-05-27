//Importar express
const express = require("express");
const cors = require("cors");
//Inicializar librería
const app = express();
app.use(express.json());
app.use(cors());

//Endpoint
app.get("/", (req, res) => {
  res.send("Bienvenido al proyecto del taller!!!");
});


const route_usuario = require("./routes/usuario"); 
app.use(route_usuario);

/*const route_motos = require("./routes/motos"); 
app.use(route_motos);

const route_autenticacion = require("./routes/autenticacion"); 
app.use(route_autenticacion);*/

//Puerto
const port = process.env.PORT || 3001;
//Levantamiento
app.listen(port, () => {
  console.log(`Escuchando API en PORT:${port}`);
});