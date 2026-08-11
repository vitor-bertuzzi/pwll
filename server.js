const express = require('express');
const rotasUsuarios = require('./src/controllers/routes/rotasUsuarios');
const app = express();

app.use(express.json());

app.use('/api', rotasUsuarios);

app.listen(3000, () => {
    console.log('Servidor modularizando rodando na porta http://localhost:3000');
});
