const express = require("express");
const router = express.Router();

const {crearUsuario,consultarUsuarios,consultarUsuario,editarUsuario,eliminarUsuario, validarUsuario}= require("../controllers/usuario");

//Trae todos los usuarios en la base de datos
router.get("/usuario", (req, res) => {
  try{
  consultarUsuarios()
      .then(answerDB => {
          let records = answerDB.rows;
          res.send({ ok: true, info: records, mensaje: "Usuarios consultados" });
      })
      .catch(error => {
          res.send(error);
      });
    }catch(error){
      res.send(error)
    }
});

//Trae un usuario filtrado por documento
router.get("/usuario/:documento", (req, res) => {
  let documento = req.params.documento;
  console.log(documento);
  
  try{
  consultarUsuario(documento)
      .then(answerDB => {
          let records = answerDB.rows;
          res.send({ ok: true, info: records, mensaje: "Usuario consultado" });
      })
      .catch(error => {
        console.log(error);        
          res.send(error);
      });
    }catch(error){
      console.log(error);  
      res.send(error)
    }
});

//Crea un nuevo usuario en la base de datos
router.post("/usuario", (req, res) => {
  try {
    let info_usuario = req.body;
    validarUsuario(info_usuario);
    crearUsuario(info_usuario)
      .then((answerDB) => {
        res.send({ ok: true, mensaje: "Usuario guardado", info: info_usuario});
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

//Elimina un usuario de la base de datos
router.delete("/usuario/:documento", (req, res) => {
  try {
    let info_usuario = req.params.documento;
    eliminarUsuario(info_usuario)
      .then((answerDB) => {
        res.send({ok: true, info: info_usuario, mensaje: "Usuario eliminado"});
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

//Actualiza un usuario en la base de datos
router.put("/usuario/:documento", (req, res) => {
  try {

    let id = req.params.id;
    let info_usuario = req.body;

    editarUsuario(info_usuario, id)
      .then((answerDB) => {
        res.send({ ok: true, mensaje: "Usuario editado", info: info_usuario });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;