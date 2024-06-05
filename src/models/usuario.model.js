//const db = global.db;

const createUser = async (userData) => {
  const [result] = await db.query(
    `INSERT INTO usuario (name, lastname, email, photo, password, verified) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userData.name,
      userData.lastname,
      userData.email,
      userData.photo,
      userData.password,
      0,
    ]
  );
  return result;
};

const getUserById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM usuario WHERE user_id = ?`, [
    id,
  ]);
  return rows[0];
};

const getAllUsers = async () => {
  const [rows] = await db.query(`SELECT * FROM usuario`);
  return rows;
};

const updateUser = async (id, userData) => {
  const [result] = await db.query(
    `UPDATE usuario SET name = ?, lastname = ?, email = ?, photo = ?, password = ? WHERE user_id = ?`,
    [
      userData.name,
      userData.lastname,
      userData.email,
      userData.photo,
      userData.password,
      id,
    ]
  );
  return result;
};

const deleteUser = async (id) => {
  const [result] = await db.query(`DELETE FROM usuario WHERE user_id = ?`, [
    id,
  ]);
  return result;
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
