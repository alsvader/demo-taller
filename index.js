// http
// get -> obtener informacion
// post ->  crear datos
// put -> actualizar datos
// delete -> delete datos
// patch -> combinacion post, put, delete

const app = require('./server/server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Servidor iniciado'));
