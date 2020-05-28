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

//Versión del apo
const vs = "/api/v1/"

const route_autenticacion = require("./routes/autenticacion"); 
app.use(vs, route_autenticacion);

const route_usuario = require("./routes/usuario"); 
app.use(vs, route_usuario);

const route_motos = require("./routes/moto"); 
app.use(vs, route_motos);

const route_mantenimientos = require("./routes/mantenimientos"); 
app.use(vs, route_mantenimientos);

app.use('/', (req,res)=>{
  req.status(400).send({ ok: false, info: error, mensaje: "El recurso no exisite" });
})
//Puerto
const port = process.env.PORT || 3001;
//Levantamiento
app.listen(port, () => {
  console.log(`Escuchando API en PORT:${port}`);
});