
const ServicioPg = require("../services/postgress");

let validarMantenimiento = (mantenimiento) => {
  if (!mantenimiento) {
    throw {
      ok: false,
      mensaje: "La información del mantenimiento es obligatoria",
    };
  } else if (!mantenimiento.placa) {
    throw {
      ok: false,
      mensaje: "La placa es obligatoria",
    };
  } else if (!mantenimiento.id_mecanico) {
    throw {
      ok: false,
      mensaje: "La cedula del mecanico es obligatoria",
    };
  } else if (!mantenimiento.fecha) {
    throw {
      ok: false,
      mensaje: "La fecha es obligatoria",
    };
  }
};

let consultarMantenimientos = async () => {
  let _service = new ServicioPg();
  let sql = `SELECT id_mecanico, placa, fecha, trabajos_realizados, horas_invertidas
    FROM public.mantenimientos`;
  let respuesta = await _service.ejecutarSql(sql);
  return respuesta;
};

let consultarMantenimiento = async (id_mecanico,placa, fecha) => {
  let _service = new ServicioPg();
  let sql = `SELECT id_mecanico, placa, fecha, trabajos_realizados, horas_invertidas
    FROM public.mantenimientos where id_mecanico = $1 and placa = $2 and fecha = $3`;
  let values = [id_mecanico,placa,fecha];
  let respuesta = await _service.ejecutarSql(sql, values);
  return respuesta;
};

let crearMantenimiento = async (mantenimiento) => {
  let _service = new ServicioPg();
  let sql = `INSERT INTO public.mantenimientos(
        id_mecanico, placa, fecha, trabajos_realizados, horas_invertidas)
        VALUES ($1, $2, $3, $4, $5)`;
  let values = [
    mantenimiento.id_mecanico,
    mantenimiento.placa,
    mantenimiento.fecha,
    mantenimiento.trabajos_realizados,
    mantenimiento.horas_invertidas,
  ];
  let respuesta = await _service.ejecutarSql(sql, values);
  return respuesta;
};

let eliminarMantenimiento = (id_mecanico,placa,fecha) => {
  let _service = new ServicioPg();
  let sql = `DELETE FROM public.mantenimientos
    WHERE id_mecanico = $1 and placa = $2 and fecha = $3` ;
  let values = [id_mecanico, placa, fecha];
  let respuesta = _service.ejecutarSql(sql, values);
  return respuesta;
};

let editarMantenimiento = async (
  mantenimiento,
  id_mecanico,
  placa,
  fecha
) => {
  let _service = new ServicioPg();
  let sql = `UPDATE public.mantenimientos
	SET trabajos_realizados=$1, horas_invertidas=$2
    WHERE id_mecanico=$3 and placa = $4 and fecha =$5`;
  let values = [
    mantenimiento.trabajos_realizados,
    mantenimiento.horas_invertidas,
    id_mecanico,
    placa,
    fecha,
  ];
  let respuesta = await _service.ejecutarSql(sql, values);
  return respuesta;
};

module.exports = {
  editarMantenimiento,
  consultarMantenimiento,
  consultarMantenimientos,
  validarMantenimiento,
  eliminarMantenimiento,
  crearMantenimiento,
};