require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { PORT, MONGO_URL } = require('./utils/config');
const router = require("./routes/routs");
const {requestLogger, errorLogger} = require("./middlewares/logger");
const {handleCenterError} = require("./middlewares/handleCenterError");

const app = express();
app.use(cors());

// **В Express > = 4.16 синтаксический анализатор тела был повторно добавлен в методы express.json()
app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect(MONGO_URL);

app.use(requestLogger); // подключаем логгер запросов

app.use(router); // все роуты

app.use(errorLogger); // подключаем логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// централизованная обработка ошибок
app.use(handleCenterError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

// npm run lint -- --fix - чтобы фиксить ошибки с линтером
