const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Esta es la ruta /');
});

router.get('/mejoresalumnos', (req, res) => {
  res.send('Lista de los mejores alumnos');
});

module.exports = router;
