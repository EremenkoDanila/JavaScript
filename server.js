const express = require('express');

const stocks = require('./internal/stocks');
const sber_service = require('./internal/sber_service');
const main_pics = require('./internal/main_pics');

const app = express();

const HOST = 'localhost';
const PORT = 8000;

app.use(express.json());
app.use('/stocks', stocks);
app.use('/sber_service', sber_service);
app.use('/main_pics', main_pics);

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});