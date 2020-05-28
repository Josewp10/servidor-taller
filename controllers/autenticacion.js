const ServicioPg = require("../services/postgress");


//Importar la librería JWT
const jwt = require('jsonwebtoken');
const SECRET_KEY ="55e49423ebcf416e83dd4617cedb86fdae17b1d71229dfeb4198f27d49b1d8d75f615f34a351f15d5ed218b917fc14343316ad740f13767d2ca08a8d2b42529e";

//Permite validar la información de los campos de usuario
let validarUsuario =async (usuario) =>{
    if (!usuario) {
        throw{ ok:false, mensaje: "Ingrese la información del usuario"}
    }else if (!usuario.documento){
        throw{ ok:false, mensaje: "Ingrese la información del usuario"}
    }else if (!usuario.clave){
        throw{ ok:false, mensaje: "Ingrese la clave del usuario"}
    }
};

//Consulta usuario por documento y clave
let consultarUsuario = async (usuario)=>{
    let _servicio = new ServicioPg();
    //console.log(usuario);    
    let sql = `SELECT * FROM public.usuarios WHERE documento = $1 AND clave = md5($2);`;
    let values = [usuario.documento, usuario.clave]
    let respuesta = await _servicio.ejecutarSql(sql, values);  
    return respuesta;
};

//Toma los datos de la persona y genera un token
let generarToken =  (persona)=>{    
    delete persona.clave;
    let token = jwt.sign(persona, SECRET_KEY);   
    return token;
}

let verificarToken = (token) =>{
    return jwt.verify(token, SECRET_KEY, {expiresIn: "1h"});
}

let descifrarToken = (token) => {
    return jwt.decode(token, SECRET_KEY);      
  }
module.exports = {validarUsuario, consultarUsuario, generarToken, verificarToken, descifrarToken};