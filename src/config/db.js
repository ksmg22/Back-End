const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

global.db = pool.promise();

// Verificar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectarse a la base de datos:", err.message);
  } else {
    console.log("Base de datos conectada");
    connection.release();
  }
});
