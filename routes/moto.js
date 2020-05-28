const express = require("express");
const router = express.Router();

const {
  consultarMoto,
  consultarMotos,
  eliminarMoto,
  crearMoto,
  editarMoto,
  validarMoto,
}= require("../controllers/moto");

//Trae todos las motos en la base de datos
router.get("/moto", (req, res) => {
  try{
  consultarMotos()
      .then(answerDB => {
          let records = answerDB.rows;
          res.send({ ok: true, info: records, mensaje: "Motos consultadas" });
      })
      .catch(error => {
          res.send(error);
      });
    }catch(error){
      res.send(error)
    }
});

//Crea un nuevo moto en la base de datos
router.post("/moto", (req, res) => {
  try {
    let info_moto = req.body;
    validarMoto(info_moto);
    crearMoto(info_moto)
      .then((answerDB) => {
        res.send({ ok: true, mensaje: "Moto guardada", info: info_moto});
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

//Elimina un moto de la base de datos
router.delete("/moto/:placa", (req, res) => {
  try {
    let info_moto = req.params.documento;
    eliminarMoto(info_moto)
      .then((answerDB) => {
        res.send({ok: true, info: info_moto, mensaje: "Moto eliminada"});
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

//Actualiza un moto en la base de datos
router.put("/moto/:placa", (req, res) => {
  try {

    let id = req.params.id;
    let info_moto = req.body;

    editarMoto(info_moto, id)
      .then((answerDB) => {
        res.send({ ok: true, mensaje: "Moto editada", info: info_moto });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;