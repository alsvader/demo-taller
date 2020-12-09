const express = require('express');
const joi = require('joi');
const router = express.Router();

router.get('/agregar', (req, res) => {
  const errores = req.flash('errores');

  res.render('formularioAgregar', {
    titulo: 'Agregar nuevo elemento',
    errores: errores,
  });
});

router.post('/agregar', (req, res) => {
  const esquema = joi.object({
    titulo: joi.string().min(3).required(),
    descripcion: joi.string().min(10).max(20).required(),
    contenido: joi.string().min(10).max(30).required(),
  });

  const validacion = esquema.validate(req.body);

  let errores = [];

  // ''
  // null
  // undefined
  // === false
  if (validacion.error) {
    errores = validacion.error.details.map((item) => item.message);
    req.flash('errores', errores);
  }

  res.redirect('/articulos/agregar');
});

module.exports = router;
