const express = require('express');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

// npm run lint -- --fix - чтобы фиксить ошибки с линтером
