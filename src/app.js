const express = require("express");
const cors = require("cors");
const app = express();
const apiRoutes = require("./routes/api");

app.use(cors({
  origin: 'http://localhost:4200' 
}));

app.use(express.json());
app.use("/api", apiRoutes);

module.exports = app;
