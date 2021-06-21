const { Schema, model } = require("mongoose");

const notasSchema = new Schema(
  {
    descripcion: {
      type: String,
    },
    usuario: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Nota", notasSchema);
