const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const inicioRutas = require('../rutas/inicio');
const adminRutas = require('../rutas/administracion');
const articulosRutas = require('../rutas/articulos');
const db = require('../models/index');

const app = express();

app.set('views', './vistas');
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'millavesecreta',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use('/storage', express.static(path.join(__dirname, '../publica')));

app.use('/usuarios', inicioRutas);
app.use('/administracion', adminRutas);
app.use('/articulos', articulosRutas);

app.get('/conocenos', (req, res) => {
  res.send('somos una empresa de software');
});

app.get('/usuarios', (req, res) => {
  res.send('lista de usuarios');
});

app.get('/plantilla', (req, res) => {
  res.render('index', {
    titulo: 'curso node',
    bienvenida: 'Bienvenidos al curso de node',
  });
});

app.get('/iniciosesion', (req, res) => {
  res.render('login', {
    titulo: 'curso node - inicio sesion',
  });
});

app.get('/basededatos', (req, res) => {
  // db.articulos
  //   .findAll() // SELECT * FROM articulos;
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  db.articulos
    .create({
      titulo: 'primer titulo',
      descripcion: 'una descripcion',
      contenido: 'el contenido',
      image: 'image.png',
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  res.send('obteniendo información');
});

module.exports = app;
