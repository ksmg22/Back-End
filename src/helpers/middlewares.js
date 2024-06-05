const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario.model");
const Grupo = require("../models/grupo.model");

const checkToken = async (req, res, next) => {
  // ¿El token existe dentro de la petición?
  if (!req.headers["authorization"]) {
    return res
      .status(403)
      .json({ error: "Debes incluir el token de autorización" });
  }

  const token = req.headers["authorization"];

  // ¿El token es correcto?
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }

  // Recuperar el usuario
  const [result] = await Usuario.selectById(payload.user.id);
  req.user = result[0];

  next();
};

const checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Debes ser administrador" });
  }
  next();
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({ error: `Debes tener role ${role}` });
    }
    next();
  };
};

const checkGrupoId = async (req, res, next) => {
  const { grupo_id } = req.params;

  const [result] = await Grupo.selectById(grupo_id);

  if (result.length === 0) {
    return res.status(404).json({ error: "El id del grupo es incorrecto" });
  }

  next();
};

module.exports = {
  checkToken,
  checkAdmin,
  checkRole,
  checkGrupoId,
};
