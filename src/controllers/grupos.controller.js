const {
  createGroup,
  getGroupById,
  getAllGroups,
  updateGroup,
  deleteGroup,
} = require("../models/grupo.model");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await getGroupById(req.params.id);
    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ error: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const group = await createGroup(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const group = await updateGroup(req.params.id, req.body);
    if (group.affectedRows > 0) {
      res.json({ message: "Group updated" });
    } else {
      res.status(404).json({ error: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const result = await deleteGroup(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ message: "Group deleted" });
    } else {
      res.status(404).json({ error: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
