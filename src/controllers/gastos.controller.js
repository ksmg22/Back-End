const {
  createGasto,
  getGastoById,
  getAllGastos,
  updateGasto,
  deleteGasto,
} = require("../models/gasto.model");

exports.createGasto = async (req, res) => {
  try {
    const gasto = await createGasto(req.body);
    res.status(201).json(gasto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGastoById = async (req, res) => {
  try {
    const gasto = await getGastoById(req.params.id);
    if (gasto) {
      res.json(gasto);
    } else {
      res.status(404).json({ error: "Gasto not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGastos = async (req, res) => {
  try {
    const gastos = await getAllGastos();
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGasto = async (req, res) => {
  try {
    const gasto = await updateGasto(req.params.id, req.body);
    if (gasto.affectedRows > 0) {
      res.json({ message: "Gasto updated" });
    } else {
      res.status(404).json({ error: "Gasto not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGasto = async (req, res) => {
  try {
    const result = await deleteGasto(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ message: "Gasto deleted" });
    } else {
      res.status(404).json({ error: "Gasto not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
