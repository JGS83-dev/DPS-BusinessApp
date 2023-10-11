const express = require('express');
const cors = require('cors');
const ObtenerEventos = require('./src/rutas/controladores/EventosController');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  let response = {};
  try {
    response.data = ObtenerEventos
    response.message = 'Eventos obtenidos con éxito'
    res.status = 200
  } catch (e) {
    console.log('Error:', e);
    response.data = ObtenerEventos
    response.message = 'Eventos obtenidos con éxito'
    res.status = 500
  }

  res.json(response);
});

const port = 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = {
  app
};