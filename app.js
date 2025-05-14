const express = require('express');
const app = express();
const patrimonioRoutes = require('././Back-end/rotas/patrimonioRoute');  // Caminho correto para o arquivo de rotas
const cors = require('cors');

app.use(cors());
app.use(express.json()); // para interpretar JSON
app.use('/patrimonios', patrimonioRoutes);

module.exports = app;