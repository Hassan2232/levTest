const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const config = require('./config/db');

const app = express();

const port = 5000;

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(bodyParser.json())

app.use(cors());

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
    console.log('Успешное подключение к БД');
});

mongoose.connection.on('error', (err) => {
    console.log('При подключении к БД произошла ошибка: ' + err);
});

app.listen(port, () => {
    console.log("Сервер был запущен на порту: " + port)
});

app.use('/auth', require('./routes/auth.route'));
app.use('/link', require('./routes/link.route'));