const db = require("../config/db");

const createGasto = async (groupId, amount, description) => {
  const [result] = await db.query(
    "INSERT INTO gasto (group_id, amount, description) VALUES (?, ?, ?)",
    [groupId, amount, description]
  );
  return result;
};

const getGastoById = async (id) => {
  const [rows] = await db.query("SELECT * FROM gasto WHERE expense_id = ?", [
    id,
  ]);
  return rows[0];
};

const getAllGastos = async () => {
  const [rows] = await db.query("SELECT * FROM gasto");
  return rows;
};

const updateGasto = async (id, updateData) => {
  const { groupId, amount, description } = updateData;
  const [result] = await db.query(
    "UPDATE gasto SET group_id = ?, amount = ?, description = ? WHERE expense_id = ?",
    [groupId, amount, description, id]
  );
  return result;
};

const deleteGasto = async (id) => {
  const [result] = await db.query("DELETE FROM gasto WHERE expense_id = ?", [
    id,
  ]);
  return result;
};

module.exports = {
  createGasto,
  getGastoById,
  getAllGastos,
  updateGasto,
  deleteGasto,
};
