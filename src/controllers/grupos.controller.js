const {
  createGroup,
  getGroupById,
  getAllGroups,
  updateGroup,
  deleteGroup,
  getAllGroupsUser,
} = require("../models/grupo.model");

const createGroupHandler = async (req, res) => {
  try {
    const group = await createGroup(req.body);
    res.status(201).json(group);
  } catch (error) {
    console.error("Error creado grupo:", error);
    res.status(500).json({ error: error.message });
  }
};

const getGroupByIdHandler = async (req, res) => {
  try {
    const group = await getGroupById(req.params.id);
    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ error: "Grupo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllGroupsHandler = async (req, res) => {
  try {
    const groups = await getAllGroupsUser();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGroupHandler = async (req, res) => {
  try {
    const group = await updateGroup(req.params.id, req.body);
    if (group.affectedRows > 0) {
      res.json({ message: "Grupo actualizado" });
    } else {
      res.status(404).json({ error: "Grupo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGroupHandler = async (req, res) => {
  try {
    const result = await deleteGroup(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ message: "Grupo eliminado" });
    } else {
      res.status(404).json({ error: "Grupo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGroupHandler,
  getGroupByIdHandler,
  getAllGroupsHandler,
  updateGroupHandler,
  deleteGroupHandler,
};
