const jwt = require("jsonwebtoken");
const UsuerModel = require('../models/usuario.model')

const protegida = async (req, res, next) => {
    //revisamos si si nos estan enviando el encabezado
 if(!req.headers.authorization){
    return res.json({
        mensaje: "No estas autorizado",
      });
 }

 //extraemos el token
 const token = req.headers.authorization.split(" ")[1];
 if(token === null){
    return res.json({
        mensaje: "No estas autorizado",
      });
 }
 jwt.verify(token, 'axel', async ( error, payload)=>{
    if(error){
      return res.json({
          mensaje: "No estas autorizado",
          error
        });
   }
  
  
  const decoded = payload;
  req.usuario = await UsuerModel.findById({_id: decoded._id});
  next()
})
 
}

module.exports = protegida;