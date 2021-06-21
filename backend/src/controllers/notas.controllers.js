const notasCtrl = {};
const NotasModel = require("../models/notas.model");

notasCtrl.obtenerNotasUsuario = async (req, res) => {
  try {
    const usuario = req.params.id;
    const notas = await NotasModel.find({ usuario: usuario });
    res.json({
      ok: true,
      notas,
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Obtener todas las notas de un usuario ${error.message}`,
    });
  }
};

notasCtrl.obtenerNota = async (req, res) => {
  try {
    const id = req.params.id;
    const nota = await NotasModel.findById({_id: id})
    res.json({
        ok: true,
        nota
    })
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en Obtener una nota de un usuario ${error.message}`,
    });
  }
};

notasCtrl.agregarNota = async (req, res) => {
  try {
    const { usuario, descripcion } = req.body;
    const newNota = new NotasModel({
      usuario,
      descripcion,
    });
    const saveNota = await newNota.save();
    res.json({
      ok: true,
      mensaje: "Nota Guardada",
      saveNota,
    });
  } catch (error) {
    res.json({
      ok: false,
      mensaje: `error en agregar una nota ${error.message}`,
    });
  }
};

notasCtrl.update = async (req, res) => {
    try {
        const id = req.params.id
        const actualizada = await NotasModel.findByIdAndUpdate({_id: id}, req.body)
        res.json({
            ok: true,
            mensaje: "Nota Actualizada",
            actualizada
        })
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en update una nota ${error.message}`,
          });
    }
}

notasCtrl.delete = async (req, res) => {
    try {
        const id = req.params.id
        const eliminada = await NotasModel.findByIdAndDelete({_id: id})
        res.json({
            ok: true,
            mensaje: "Nota Eliminada",
            eliminada
        })
    } catch (error) {
        res.json({
            ok: false,
            mensaje: `error en delete una nota ${error.message}`,
          });
    }
}

module.exports = notasCtrl;
