const express = require('express');

const stocks = require('./internal/stocks');
const sber_service = require('./internal/sber_service');

const app = express();

const HOST = 'localhost';
const PORT = 8000;

app.use(express.json());

// Подключаем модуль stocks к маршруту /stocks
app.use('/stocks', stocks);

// Подключаем модуль sber_service к маршруту /sber
app.use('/sber_service', sber_service);

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});