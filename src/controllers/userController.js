module.exports = (db) => {
    const getUsers = (req, res) => {
      db.query('SELECT * FROM usuario', (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).json(result);
      });
    };
  
    const createUser = (req, res) => {
      const { name, email, password, verified } = req.body;
      db.query('INSERT INTO usuario (name, email, password, verified) VALUES (?, ?, ?, ?)', 
               [name, email, password, verified], 
               (err, result) => {
                 if (err) res.status(500).send(err);
                 else res.status(201).send('Usuario creado con éxito');
               });
    };
  
    return { getUsers, createUser };
  };