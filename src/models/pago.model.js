//const db = global.db;

const createPago = async (pagoData) => {
  const [result] = await db.query(
    `INSERT INTO pago (expense_id, user_id, amount_paid) VALUES (?, ?, ?)`,
    [pagoData.expense_id, pagoData.user_id, pagoData.amount_paid]
  );
  return result;
};

const getPagoById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM pago WHERE payment_id = ?`, [
    id,
  ]);
  return rows[0];
};

const getAllPagos = async () => {
  const [rows] = await db.query(`SELECT * FROM pago`);
  return rows;
};

const updatePago = async (id, pagoData) => {
  const [result] = await db.query(
    `UPDATE pago SET expense_id = ?, user_id = ?, amount_paid = ? WHERE payment_id = ?`,
    [pagoData.expense_id, pagoData.user_id, pagoData.amount_paid, id]
  );
  return result;
};

const deletePago = async (id) => {
  const [result] = await db.query(`DELETE FROM pago WHERE payment_id = ?`, [
    id,
  ]);
  return result;
};

module.exports = {
  createPago,
  getPagoById,
  getAllPagos,
  updatePago,
  deletePago,
};
