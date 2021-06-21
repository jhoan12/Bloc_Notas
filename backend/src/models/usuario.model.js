const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

//metodo para encryptar la contraseña
usuarioSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.log("error en matchPassword", error.message);
  }
};

//si el usuario se actualiza y la contraseña cambia (isModified), 
//entonces se encrypta la contraseña nueva, utlizamos el metodo pre, 
//que significa previo al evento save en mongodb, es decir, antes de 
//guarda hagame lo que tiene la funcion, que es encryptar la nueva contraseña
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = model("Usuario", usuarioSchema);