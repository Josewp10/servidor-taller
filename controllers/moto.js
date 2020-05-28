const ServicePg = require("../services/postgress");

let validarMoto = (moto) => {
  if (!moto) {
    throw {
      ok: false,
      mensaje: "La información de la moto es obligatoria",
    };
  } else if (!moto.placa) {
    throw {
      ok: false,
      mensaje: "Ingrese la placa de la moto",
    };
  } else if (!moto.estado) {
    throw {
      ok: false,
      mensaje: "Ingrese el estado de la moto",
    };
  } else if (!moto.clase) {
    throw {
      ok: false,
      mensaje: "Ingrese la clase de moto",
    };
  } else if (!moto.marca) {
    throw {
      ok: false,
      mensaje: "Ingrese la marca de la moto",
    };
  } else if (!moto.modelo) {
    throw {
      ok: false,
      mensaje: "Ingrese el modelo de la moto",
    };
  } else if (!moto.color) {
    throw {
      ok: false,
      mensaje: "Ingrese el color de la moto",
    };
  } else if (!moto.cilindraje) {
    throw {
      ok: false,
      mensaje: "Ingrese el cilindraje de la moto",
    };
  } else if (!moto.id_propietario) {
    throw {
      ok: false,
      mensaje: "Ingrese el id del propietario",
    };
  } else if (!moto.nro_soat) {
    throw {
      ok: false,
      mensaje: "Ingrese el # de SOAT",
    };
  } else if (!moto.vencimiento_soat) {
    throw {
      ok: false,
      mensaje: "Ingrese la fecha de vencimiento del SOAT",
    };
  }else if (!moto.nro_tecnomecanica) {
    throw {
      ok: false,
      mensaje: "Ingrese el # de la Tecnomecánica",
    };
  }else if (!moto.vencimiento_tecnomecanica) {
    throw {
      ok: false,
      mensaje: "Ingrese la fecha de vencimiento de la Tecnomecánica",
    };
  }
};


let crearMoto = async (moto) => {
  let _service = new ServicePg();
  let sql = `INSERT INTO public.motos(
        placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, 
        vencimiento_tecnomecanica)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $18, $9, $10, $11, $12)`;
  let values = [
    moto.placa,
    moto.estado,
    moto.clase,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_prop,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecnomecanica,
    moto.vencimiento_tecnomecanica,
  ];
  let respuesta = await _service.ejecutarSql(sql, values);
  return respuesta;
};

let consultarMoto = async (placa) => {
    let _service = new ServicePg();
    let sql = `SELECT placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica
      FROM public.motos where placa = $1`;
    let respuesta = await _service.ejecutarSql(sql,[placa]);
    return respuesta;
  };

  let consultarMotos = async () => {
    let _service = new ServicePg();
    let sql = `SELECT placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica
      FROM public.motos`;
    let respuesta = await _service.ejecutarSql(sql);
    return respuesta;
  };

let eliminarMoto = (placa) => {
  let _service = new ServicePg();
  let sql = `DELETE FROM public.motos where placa = $1`;
  let respuesta = _service.ejecutarSql(sql);
  return respuesta;
};

let editarMoto = async (moto, placa) => {
  let _service = new ServicePg();
  let sql = `UPDATE public.motos
    SET  estado=$1, clase=$2, marca=$3, modelo=$4, color=$5, cilindraje=$6, id_propietario=$7, 
    nro_soat=$8, vencimiento_soat=$9, nro_tecnomecanica=$10, vencimiento_tecnomecanica=$11
    WHERE placa = $12`;
  let values = [
    moto.estado,
    moto.clase,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_prop,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecno,
    moto.vencimiento_tecno,
    placa,
  ];
  let respuesta = _service.ejecutarSql(sql, values);
  return respuesta;
};
module.exports = {
  consultarMoto,
  consultarMotos,
  eliminarMoto,
  crearMoto,
  editarMoto,
  validarMoto,
};