const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do middleware
app.use(bodyParser.json());
app.use(cors());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'seu_banco_de_dados'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Endpoint para salvar convidados
app.post('/api/convidados', (req, res) => {
    const { nome, telefone, amigo_da_noiva, amigo_do_noivo, acompanhantes } = req.body;
    const sql = 'INSERT INTO convidados (nome, telefone, amigo_da_noiva, amigo_do_noivo, acompanhantes) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, telefone, amigo_da_noiva, amigo_do_noivo, acompanhantes], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Convidado salvo com sucesso!' });
    });
});

// Endpoint para listar todos os convidados
app.get('/api/convidados', (req, res) => {
    const sql = 'SELECT * FROM convidados';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
