const ServicioPg = require("../services/postgress");

let validarUsuario =(usuario) =>{
    if (!usuario) {
        throw{ ok:false, mensaje: "Ingrese la información del usuario"}
    } else if(!usuario.tipo_documento){
        throw{ ok:false, mensaje: "Ingrese el tipo de documento del usuario"}
    }else if(!usuario.documento){
        throw{ ok:false, mensaje: "Ingrese el documento del usuario"}
    }else if(!usuario.nombre){
        throw{ ok:false, mensaje: "Ingrese el nombre del usuario"}
    }else if(!usuario.apellidos){
        throw{ ok:false, mensaje: "Ingrese los apellidos del usuario"}
    }else if(!usuario.celular){
        throw{ ok:false, mensaje: "Ingrese el telefono celular del usuario"}
    }else if(!usuario.correo){
        throw{ ok:false, mensaje: "Ingrese el correo del usuario"}
    }else if(!usuario.rol){
        throw{ ok:false, mensaje: "Ingrese el rol del usuario"}
    }else if(!usuario.clave){
        throw{ ok:false, mensaje: "Ingrese la clave del usuario"}
    }
}

let crearUsuario = async (usuario) =>{
    let _servicio = new ServicioPg();
    let sql = `INSERT INTO public.usuarios(
        tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    let valores = [usuario.tipo_documento, usuario.documento, usuario.nombre, 
                    usuario.apellidos, usuario.celular, usuario.correo, usuario.rol, usuario.clave];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
};

let consultarUsuarios = async () =>{
    let _servicio = new ServicioPg();
  let sql = `SELECT tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave
            FROM public.usuarios;`;
  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let eliminarUsuario = async (documento) => {
    let _servicio = new ServicioPg();
    console.log(documento);
    let sql = `DELETE FROM public.usuarios
	            WHERE documento = $1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [documento]);
    return respuesta;
  };

  let editarUsuario = async (usuario, documento) => {
    if (usuario.documento != documento) {
      throw {
        ok: false,
        mensaje: "El documento del usuario no corresponde con el ingresado",
      };
    }

    let _servicio = new ServicioPg();
  
    let sql =`UPDATE public.usuarios
	        SET tipo_documento=$1, documento=$2, nombre=$3, apellidos=$4, celular=$5, correo=$6, rol=$7, clave=$8
	        WHERE documento = $2;`;
    let valores = [usuario.tipo_documento, usuario.documento, usuario.nombre, 
                usuario.apellidos, usuario.celular, usuario.correo, usuario.rol, usuario.clave];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
  
    return respuesta;
  };

  module.exports = {crearUsuario, eliminarUsuario, editarUsuario, consultarUsuarios, validarUsuario};