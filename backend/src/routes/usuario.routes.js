const { Router } = require("express");
const { check } = require("express-validator");
const usuarioCtrl = require("../controllers/usuario.controllers");
const validar = require("../helpers/db-validaciones");
const protegida = require("../middlewares/auth");
const validarCampos = require("../middlewares/validar-campos");

const route = Router();
route.get("/usuarios", protegida, usuarioCtrl.obtenerUsuarios)
route.get(
  "/usuario/:id",
  [
    check("id", "El Id que ingresas No es un Id valido").isMongoId(),
    check("id").custom((id) => validar.existeUsuarioPorId(id)),
    validarCampos,
  ], protegida,
  usuarioCtrl.obtenerPorId
);
route.post(
  "/login",
  [
    check("email", "El Correo es obligatorio").isEmail(),
    check("password", "La Contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  usuarioCtrl.login
);
route.post(
  "/registrar",
  [
    check("email", "El Correo es obligatorio").isEmail(),
    check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
    check(
      "password",
      "La Contraseña debe contener mas de 6 caracteres"
    ).isLength({ min: 6 }),
    check("email").custom((email) => validar.emailExiste(email)),
    validarCampos,
  ],
  usuarioCtrl.register
);
route.put(
  "/update/:id",
  [
    check("id", "El Id que ingresas No es un Id valido").isMongoId(),
    check("id").custom((id) => validar.existeUsuarioPorId(id)),
    check("email").custom((email) => validar.emailExiste(email)),
    validarCampos,
  ],
  protegida,
  usuarioCtrl.update
);
route.delete(
  "/delete/:id",
  [
    check("id", "El Id que ingresas No es un Id valido").isMongoId(),
    check("id").custom((id) => validar.existeUsuarioPorId(id)),
    validarCampos,
  ],
  protegida,
  usuarioCtrl.delete
);
module.exports = route;
