const UsuarioModel = require('../models/usuario.model')
const NotasModel = require('../models/notas.model')

const validar = {};

//antes de crear o actualizar los datos, verificamos si el correo ya existe
validar.emailExiste = async (email = " ") => {
    const existeEmail = await UsuarioModel.findOne({email})
    if (existeEmail) {
        throw new Error(`El correo: ${email} ya existe`)
    }
}

validar.notaExiste = async (id = " ") => {
    const existeNota = await NotasModel.findById({_id: id})
    if(!existeNota){
        throw new Error(`La Nota con id: ${id} no existe`)
    }
}

//verificamos que el id haga referencia a un usuario existente
validar.existeUsuarioPorId = async ( id = " " ) => {
    const existeUsuario = await UsuarioModel.findById({_id: id})
    if(!existeUsuario){
        throw new Error(`El Usuario con id: ${id} no existe`)
    }
}
module.exports = validar;