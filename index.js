const express = require('express');
const app = express();

const connection = require('./src/database/database');
const Pergunta = require('./src/model/Pergunta');

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco');
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then((perguntas) => {
            res.render('index',
                {
                    perguntas: perguntas
                });
        });

});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    let { titulo } = req.body;
    let { descricao } = req.body;

    Pergunta.create(
        {
            titulo: titulo,
            descricao: descricao
        }
    ).then(() => {
        console.log("Pergunta salva com sucesso.");
        res.redirect('/');
    });
});

app.listen(8080, () => {
    console.log('App rodando.');
});

