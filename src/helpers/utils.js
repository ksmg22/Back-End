const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

const createToken = (usuario) => {
  try {
    const payload = {
      user_id: usuario.id,
      exp: dayjs().add(7, "days").unix(),
    };

    return jwt.sign(payload, process.env.SECRET_KEY);
  } catch (error) {
    throw new Error("Error al generar el token");
  }
};

module.exports = {
  createToken,
};