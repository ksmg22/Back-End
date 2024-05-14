const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const { getUsers, createUser } = require('./controllers/userController')(db);

  router.get('/', getUsers);
  router.post('/', createUser);

  return router;
};
