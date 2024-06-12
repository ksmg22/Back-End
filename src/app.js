const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configMensaje = require("../configMensaje");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
const apiRouter = require("./routes/api");
const gastosRoutes = require("./routes/api/gastos");
const pagosRoutes = require("./routes/api/pagos");

app.use("/api", apiRouter);
app.use("/api/gastos", gastosRoutes);
app.use("/api/pagos", pagosRoutes);

app.post("/api/sendmail", (req, res) => {
  configMensaje(req.body);
  res.status(200).send("Correo enviado");
});

module.exports = app;
