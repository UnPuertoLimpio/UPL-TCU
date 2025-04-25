const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = './data.json';

app.use(cors());
app.use(express.json());

// GET data
/*app.get('/data', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error leyendo JSON');
    res.json(JSON.parse(data));
  });
});*/

app.get('/data', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer data.json:', err);
      return res.status(500).send('Error leyendo JSON');
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (e) {
      console.error('JSON mal formado:', e);
      res.status(500).send('JSON inválido');
    }
  });
});


/*app.get('/', (req, res) => {
  res.send('Servidor backend activo 🟢');
});*/

// PUT data
app.put('/data', (req, res) => {
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Error escribiendo JSON');
    res.send('JSON actualizado correctamente');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
