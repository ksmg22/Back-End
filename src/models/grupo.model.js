const db = global.db;

const createGroup = async (groupData) => {
  const [result] = await db.query(
    `INSERT INTO grupo (title, description, creation_date) VALUES (?, ?, NOW())`,
    [groupData.title, groupData.description]
  );
  return result;
};

const getUserIdByEmail = async (email) => {
  const [rows] = await db.query('SELECT user_id FROM usuario WHERE email = ?', [email]);
  console.log(`Resultado de getUserIdByEmail para ${email}:`, rows);
  return rows.length > 0 ? rows[0].user_id : null;
};

const addGroupMember = async (groupId, userId, percentage) => {
  const [result] = await db.query(
    `INSERT INTO grupo_miembro (group_id, user_id, percentage) VALUES (?, ?, ?)`,
    [groupId, userId, percentage]
  );
  return result;
};

const getGroupById = async (id) => {
  const [group] = await db.query(`SELECT * FROM grupo WHERE group_id = ?`, [id]);
  const [users] = await db.query(`SELECT name,lastname,email,photo FROM proyecto.usuario WHERE user_id IN (SELECT user_id FROM proyecto.grupo_miembro WHERE group_id = ?);`, [id]);

  group[0]['users'] = users;
  const arrayUsers = group[0]['users'];

  // Usamos un bucle for...of para manejar promesas correctamente
  for (const element of arrayUsers) {

    // Obtenemos los gastos del usuario de forma asíncrona
    const [gastos] = await db.query(`SELECT e.*
    FROM proyecto.grupo_miembro gm
    JOIN proyecto.usuario u ON gm.user_id = u.user_id
    JOIN proyecto.gasto e ON e.user_id_gasto = u.user_id
    WHERE e.group_id = ? AND e.user_id_gasto = ?`, [id, element['user_id']]);

    // Añadimos los gastos al usuario correspondiente
    element['gastos'] = gastos;
  }

  return group[0];
};

const getAllGroups = async () => {
  const [rows] = await db.query(`SELECT * FROM grupo`);
  return rows;
};

const getAllGroupsUser = async (id) => {
  const [rows] = await db.query(`
    SELECT 
        g.group_id,
        g.title,
        g.description,
        g.creation_date
    FROM 
        proyecto.usuario u
    JOIN 
        proyecto.grupo_miembro gm ON u.user_id = gm.user_id
    JOIN 
        proyecto.grupo g ON gm.group_id = g.group_id
    WHERE 
        u.user_id = ?;`,[id]);
  return rows;
};

const updateGroup = async (id, groupData) => {
  const [result] = await db.query(
    `UPDATE grupo SET title = ?, description = ? WHERE group_id = ?`,
    [groupData.title, groupData.description, id]
  );
  return result;
};

const deleteGroup = async (id) => {
  const [result] = await db.query(`DELETE FROM grupo WHERE group_id = ?`, [id]);
  return result;
};

module.exports = {
  createGroup,
  addGroupMember,
  getUserIdByEmail,
  getGroupById,
  getAllGroups,
  getAllGroupsUser,
  updateGroup,
  deleteGroup,
};
