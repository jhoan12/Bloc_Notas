const usuarioCtrl = {};
const UsuarioModel = require('../models/usuario.model')
const generateToken = require('../helpers/generateToken')
const NotasModel = require('../models/notas.model')

//obtener todos mis usuarios
usuarioCtrl.obtenerUsuarios = async(req, res) => {
    try {
        const usuarios = await UsuarioModel.find()
        res.json({
            ok: true,
            usuarios
        })
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en Obtener usuarios ${error.message}`,
          }); 
    }
}

//obtener usuario por id
usuarioCtrl.obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await UsuarioModel.findById({_id: id})
        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en Obtener usuario ${error.message}`,
          }); 
    }
}

//Login del usuario
usuarioCtrl.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const usuario = await UsuarioModel.findOne({email})

        if(usuario && (await usuario.matchPassword(password))){
            return res.json({
                ok: true,
                mensaje:`Bienvenido ${usuario.nombre}`,
                token: generateToken(usuario._id),
              });
        }else if(!usuario){
            return res.json({
                ok: false,
                mensaje: 'Email Incorrecto'
            })
        }else if(!await usuario.matchPassword(password)){
            return res.json({
                ok: false,
                mensaje: 'Password incorrecto'
            })
        }
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en Login de usuario ${error.message}`,
          });
    }
}

//crear usuario
usuarioCtrl.register = async (req, res) => {
    try {
        const {nombre, email, sexo, password,rol} = req.body
        const usuario = await UsuarioModel.create({
            nombre,
            email,
            sexo,
            password,
            rol
        })
        if(usuario){
            res.json({
                ok: true,
                usuario,
                token: generateToken(usuario._id),
              });
        }else{
            res.json({
                mensaje: "datos del usuario no validos",
            });
        }
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en Register de usuario ${error.message}`,
          });
    }
}

//actualizar usuario
usuarioCtrl.update = async (req, res) => {
    try {
        const id = req.usuario._id
        const usuario = await UsuarioModel.findById({_id: id});
        if(usuario){
            usuario.nombre = req.body.nombre || usuario.nombre;
            usuario.email = req.body.email || usuario.email;
            usuario.sexo = req.body.sexo || usuario.sexo;
            if(req.body.password){
                usuario.password = req.body.password
            }
            const updateUsuario = await usuario.save();
            res.json({
                ok: true,
                nombre: updateUsuario.nombre,
                email: updateUsuario.email,
                sexo: usuario.sexo,
                token: generateToken(updateUsuario._id)
            })
        }else{
            res.json({
                mensaje: "Usuario no encontrado",
              });
        }
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en Update de usuario ${error.message}`,
          });
    }
}

//delete usuario
usuarioCtrl.delete = async (req, res) => {
    try {
        const id = req.params.id

        await NotasModel.deleteMany({usuario: id})

        const usuario = await UsuarioModel.findByIdAndDelete({_id: id})
        res.json({
            ok: true,
            mensaje: `Adios ${usuario.nombre} ;( `,
        })
        
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en Delete de usuario ${error.message}`,
          }); 
    }
}

module.exports = usuarioCtrl;