const express = require('express');
const router = express.Router();

router.get('/agregar', (req, res) => {
  res.render('formularioAgregar', {
    titulo: 'Agregar nuevo elemento',
  });
});

router.post('/agregar', (req, res) => {
  console.log(req.body);
  res.send('procesando formulario');
});

module.exports = router;
