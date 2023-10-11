const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'Base';
  res.send(`Ruta ${name}!`);
});

const port = 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = {
  app
};