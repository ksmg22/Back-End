const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY || "default_secret";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No se proporcionó un token.",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Falló la autenticación del token.",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  if (req.verified !== 1) {
    return res
      .status(403)
      .json({ message: "No tienes permisos para realizar esta acción." });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
};
