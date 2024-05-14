//cargar variables  de entorno
require('dotenv').config({ path: './connection.env' });

// Creación y configuración de la APP de Express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Importar las rutas
const userRoutes = require('./routes/userRoutes');

// Configurar la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



// Configurar conexión a la base de datos
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  

// Verificar la conexión a la base de datos
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
  connection.release();
});

// Rutas
app.use('/api/users', userRoutes(db));



module.exports = app;