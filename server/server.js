const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const inicioRutas = require('../rutas/inicio');
const adminRutas = require('../rutas/administracion');
const articulosRutas = require('../rutas/articulos');

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

module.exports = app;
