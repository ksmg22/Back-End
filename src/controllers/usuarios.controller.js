const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../models/usuario.model");

exports.registerUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const { createToken } = require("../helpers/utils")

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.query(
      "SELECT * FROM usuario WHERE email = ? AND password = ?",
      [email, password]
    );
    if (user.length) {
      const token = createToken(user[0]);
      res.status(200).json({ user: user[0], token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (user.affectedRows > 0) {
      res.json({ message: "User updated" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
