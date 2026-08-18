const express = require('express');
const rotasUsuarios = require('./routes/rotasUsuarios');
const app = express();

app.use(express.json());
app.use('/api', rotasUsuarios);

email = "vitor@gmail.com";

// Rota principal
app.get('/', (req, res)=>{
    res.end("Bem vindo ao meu site");
});


//Query params get/saudacao
app.get('/saudacao', (req, res)=>{
    const{nome} = req.query;
    const nomeFinal = nome ? nome: 'convidado';
    res.end("Olá, ${nomeFinal}!");
});

//rota sobre
app.get('/sobre', (req, res)=>{
    res.end("Sou estudante de desenvolvimento de software");
});

//rota contato
app.get('/contato', (req, res)=>{
    res.end(email);
});






app.listen(4000, () => {
    console.log('Servidor modularizando rodando na porta http://localhost:4000');
});