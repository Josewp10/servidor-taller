const express = require("express");
const router = express.Router();
const {
    editarMantenimiento,
    consultarMantenimiento,
    consultarMantenimientos,
    validarMantenimiento,
    eliminarMantenimiento,
    crearMantenimiento,
  } = require("../controllers/mantenimientos");

router.get("/mantenimientos", (req, res) => {
  consultarMantenimientos()
    .then((answerDB) => {
      let records = answerDB.rows;
      res.send({
        ok: true,
        info: records,
        mensaje: "Mantenimientos consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/mantenimientos/:placa/:id_mecanico/:fecha", (req, res) => {
  let placa = req.params.placa;
  let id_mecanico = req.params.id_mecanico;
  let fecha = req.params.fecha

  consultarMantenimiento(id_mecanico,placa,fecha)
    .then((answerDB) => {
      res.send({
        ok: true,
        info: answerDB.rows,
        mensaje: "mantenimiento consultada",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/mantenimientos", (req, res) => {
  try {
    let info_mantenimiento = req.body;
    validarMantenimiento(info_mantenimiento);
    crearMantenimiento(info_mantenimiento)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento guardado",
          info: info_mantenimiento,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/mantenimientos/:placa/:id_mecanico/:fecha", (req, res) => {
  try {
    let placa = req.params.placa;
    let id_mecanico = req.params.id_mecanico;
    let fecha = req.params.fecha;
    eliminarMantenimiento(id_mecanico,placa,fecha)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento eliminada",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

router.put("/mantenimientos/:placa/:id_mecanico/:fecha", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let placa = req.params.placa;
    let id_mecanico = req.params.id_mecanico;
    let fecha = req.params.fecha;
    let info_mantenimiento = req.body;
    editarMantenimiento(info_mantenimiento,id_mecanico,placa,fecha)
      .then((answerDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento editado",
          info: info_usuario,
        });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;