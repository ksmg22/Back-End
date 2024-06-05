const express = require("express");
const router = express.Router();
const userRoutes = require("./api/usuarios");
const groupRoutes = require("./api/grupos");
const gastoRoutes = require("./api/gastos");
const pagoRoutes = require("./api/pagos");

router.use("/usuarios", userRoutes);
router.use("/grupos", groupRoutes);
router.use("/gastos", gastoRoutes);
router.use("/pagos", pagoRoutes);

module.exports = router;
