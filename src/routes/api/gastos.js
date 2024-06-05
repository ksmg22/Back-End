const express = require("express");
const router = express.Router();
const gastoController = require("../../controllers/gastos.controller");

router.post("/", gastoController.createGasto);
router.get("/", gastoController.getAllGastos);
router.get("/:id", gastoController.getGastoById);
router.put("/:id", gastoController.updateGasto);
router.delete("/:id", gastoController.deleteGasto);

module.exports = router;
