//const db = global.db;

const createGroup = async (groupData) => {
  const [result] = await db.query(
    `INSERT INTO grupo (title, description) VALUES (?, ?)`,
    [groupData.title, groupData.description]
  );
  return result;
};

const getGroupById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM grupo WHERE group_id = ?`, [id]);
  return rows[0];
};

const getAllGroups = async () => {
  const [rows] = await db.query(`SELECT * FROM grupo`);
  return rows;
};

const getAllGroupsUser = async () => {
  const [rows] = await db.query(`
    SELECT 
      g.group_id,
      g.title,
      g.description,
      g.date
    FROM 
      pruebas_proyecto.usuario u
    JOIN 
      pruebas_proyecto.usuario_has_grupo uhg ON u.user_id = uhg.usuario_user_id
    JOIN 
      pruebas_proyecto.grupo g ON uhg.grupo_group_id = g.group_id
    WHERE 
    u.user_id = ?;`);
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
  getGroupById,
  getAllGroups,
  getAllGroupsUser,
  updateGroup,
  deleteGroup,
};
