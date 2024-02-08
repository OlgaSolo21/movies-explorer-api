const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema ({
  country: { //страна создания фильма
    type: String,
    required: true
  },
  director: { //режиссёр фильма
    type: String,
    required: true
  },
  duration: { //длительность фильма
    type: Number,
    required: true
  },
  year: { //год выпуска фильма
    type: String,
    required: true
  },
  description: { //описание фильма
    type: String,
    required: true
  },
  image: { //ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },
  trailerLink: { //ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },
  thumbnail: { //миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: true,
    ref: 'MovieId',
  },
  nameRU: { //название фильма на русском языке
    type: String,
    required: true
  },
  nameEN: { //название фильма на английском языке
    type: String,
    required: true
  },
}, { versionKey: false, timestamps: true });

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);