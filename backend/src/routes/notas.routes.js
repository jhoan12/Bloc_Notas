const {Router} = require('express')
const { check } = require("express-validator");
const notasCtrl = require('../controllers/notas.controllers');
const validar = require('../helpers/db-validaciones');
const protegida = require('../middlewares/auth');
const validarCampos = require('../middlewares/validar-campos');


const route = Router()

route.get("/notas/:id", [
    check("id", "El Id que ingresas No es un Id valido").isMongoId(),
    check("id").custom((id) => validar.existeUsuarioPorId(id)),
    validarCampos
], protegida, notasCtrl.obtenerNotasUsuario)
route.get("/nota/:id", [
    check("id", "El Id que ingresas No es un Id valido").isMongoId(),
    check("id").custom((id) => validar.notaExiste(id)),
    validarCampos
], protegida, notasCtrl.obtenerNota)
route.post("/agregar", [
    check("descripcion","La Descripcion debe contener mas de 10 caracteres").isLength({ min: 10 }),
    validarCampos
], protegida, notasCtrl.agregarNota)
route.put("/update/:id", [
    check("id", "El Id que ingresas No es un Id valido").isMongoId(),
    check("id").custom((id) => validar.notaExiste(id)),
    check("descripcion","La Descripcion debe contener mas de 10 caracteres").isLength({ min: 10 }),
    validarCampos
], protegida, notasCtrl.update)
route.delete("/delete/:id",[
    check("id", "El Id que ingresas No es un Id valido").isMongoId(),
    check("id").custom((id) => validar.notaExiste(id)),
    validarCampos
], protegida, notasCtrl.delete)

module.exports = route;