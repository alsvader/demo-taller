// http
// get -> obtener informacion
// post ->  crear datos
// put -> actualizar datos
// delete -> delete datos
// patch -> combinacion post, put, delete

const app = require('./server/server');

app.listen(3000, () => console.log('Servidor iniciado'));
