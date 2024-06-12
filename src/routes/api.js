const express = require("express");
const router = express.Router();
const gastosRouter = require("./api/gastos");
const gruposRouter = require("./api/grupos");
const pagosRouter = require("./api/pagos");
const usuariosRouter = require("./api/usuarios");

router.use("/gastos", gastosRouter);
router.use("/grupos", gruposRouter);
router.use("/pagos", pagosRouter);
router.use("/usuarios", usuariosRouter);

module.exports = router;
