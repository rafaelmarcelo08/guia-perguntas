const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.listen(8080, () => {
    console.log('App rodando.');
});