const express = require('express');
const joi = require('joi');
const multer = require('multer');
const { v1: uuidV1 } = require('uuid');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirname = path.join(__dirname, '../publica');
    cb(null, dirname);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = uuidV1() + extension;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
}).single('archivo');

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

router.get('/formularioarchivo', (req, res) => {
  res.render('subirArchivo', { titulo: 'Subir archivo' });
});

router.post('/formularioarchivo', upload, (req, res) => {
  console.log(req.file);
  res.send('procesando');
});

module.exports = router;
