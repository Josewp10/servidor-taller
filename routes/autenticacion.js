const express = require('express');
const router = express.Router();
const {validarUsuario, consultarUsuario, generarToken, verificarToken} = require("../controllers/autenticacion");

router.use("/",(req,res, next) => {
    try {
        let url = req.url;
        
        
        if(url=='/login' || url == '/login/'){
            next()
        }else{
            let token = req.headers.token;        
           
            let verificacion = verificarToken(token);    
            next();
        }        
    } catch (error) {
        res.status(401).send({ ok: true, info: error, mensaje: "No autenticado" })
    }
    

});

router.post("/login", (req, res)=>{  
                
    try {
        let body = req.body;
        console.log("BODY"+body.clave);
        validarUsuario(body);
        
        consultarUsuario(body)
        .then(answerDB => {
            let usuario = answerDB.rowCount > 0 ? answerDB.rows[0] : undefined;
                       
            if(usuario){
            let token = generarToken(body);
            
            res.status(200).send({ ok: true, info: token, mensaje: "Usuarios consultados" });
            }else{               
                res.status(400).send({ ok: true, info: {}, mensaje: "Documento y/o clave incorrecta" });
            }
        })
        .catch(error => {
            console.log(error);            
            res.status(500).send(error);
        });
    } catch (error) {
        console.log(error);        
        res.status(400).send(error);
    }

router.get("/verificar", (req, res)=>{
    try {
        let token = req.headers.token;
        let verificacion = verificarToken(token);
        res.status(200).send({ ok: true, info: verificacion, mensaje: "Autenticado" })
    } catch (error) {
        res.status(401).send({ ok: false, info: error, mensaje: "No autenticado" })
    }
});
    
   
});

module.exports = router;