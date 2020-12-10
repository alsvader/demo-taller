const express = require('express');
const joi = require('joi');
const multer = require('multer');
const { v1: uuidV1 } = require('uuid');
const path = require('path');
const db = require('../models/index');
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

// localhost:3000/articulos
router.get('/', (req, res) => {
  db.articulos
    .findAll()
    .then((articulos) => {
      res.render('articulos', { articulos: articulos });
    })
    .catch((error) => {
      res.render('articulos', { error: 'Ocurrió un error' });
    });
});

router.get('/editar/:id', (req, res) => {
  console.log(req.params);

  db.articulos
    .findByPk(req.params.id)
    .then((articulo) => {
      console.log(articulo);
      res.render('articuloEditar', { articulo: articulo });
    })
    .catch((error) => {
      console.log(error);
    });

  // db.articulos
  //   .findOne({
  //     where: {
  //       id: req.params.id,
  //     },
  //   })
  //   .then((articulo) => {
  //     console.log(articulo);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
});

router.post('/editar/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  db.articulos
    .findByPk(id)
    .then((articulo) => {
      articulo.titulo = body.titulo;
      articulo.descripcion = body.descripcion;
      articulo.contenido = body.contenido;

      articulo
        .save()
        .then((resultado) => {
          res.redirect('/articulos');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/eliminar/:id', (req, res) => {
  const id = req.params.id;

  db.articulos
    .findByPk(id)
    .then((articulo) => {
      articulo
        .destroy()
        .then((resultado) => {
          res.redirect('/articulos');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/agregar', (req, res) => {
  const errores = req.flash('errores');
  const correcto = req.flash('correcto');
  const errorBD = req.flash('errorBD');

  res.render('formularioAgregar', {
    titulo: 'Agregar nuevo elemento',
    errores: errores,
    correcto: correcto,
    errorBD: errorBD,
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

    return res.redirect('/articulos/agregar');
  }

  // Es equivalente a solo enviar el parámetro req.body
  db.articulos
    .create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      contenido: req.body.contenido,
    })
    .then((resultado) => {
      console.log(resultado);
      req.flash('correcto', 'Se agregó un nuevo artículo');
      res.redirect('/articulos/agregar');
    })
    .catch((error) => {
      console.log(error);
      req.flash('errorBD', 'Ocurrió un error al guardar');
      res.redirect('/articulos/agregar');
    });
});

router.get('/formularioarchivo', (req, res) => {
  res.render('subirArchivo', { titulo: 'Subir archivo' });
});

router.post('/formularioarchivo', upload, (req, res) => {
  console.log(req.file);
  res.send('procesando');
});

module.exports = router;
