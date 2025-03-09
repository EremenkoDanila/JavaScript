const express = require('express');

const stocks = require('./internal/stocks');

const app = express();

const HOST = 'localhost';
const PORT = 8000;

app.use(express.json());

app.use('/stocks', stocks);

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});