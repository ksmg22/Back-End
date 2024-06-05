const {
  createPago,
  getPagoById,
  getAllPagos,
  updatePago,
  deletePago,
} = require("../models/pago.model");

exports.createPago = async (req, res) => {
  try {
    const pago = await createPago(req.body);
    res.status(201).json(pago);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPagoById = async (req, res) => {
  try {
    const pago = await getPagoById(req.params.id);
    if (pago) {
      res.json(pago);
    } else {
      res.status(404).json({ error: "Pago not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPagos = async (req, res) => {
  try {
    const pagos = await getAllPagos();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePago = async (req, res) => {
  try {
    const pago = await updatePago(req.params.id, req.body);
    if (pago.affectedRows > 0) {
      res.json({ message: "Pago updated" });
    } else {
      res.status(404).json({ error: "Pago not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePago = async (req, res) => {
  try {
    const result = await deletePago(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ message: "Pago deleted" });
    } else {
      res.status(404).json({ error: "Pago not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
