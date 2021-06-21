const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./database"); 

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));


app.use("/api/usuario", require("./routes/usuario.routes"));
app.use("/api/notas", require('./routes/notas.routes'))
app.listen(app.get("port"), () => {
  console.log("servidor escuchando por el puerto", app.get("port"));
});