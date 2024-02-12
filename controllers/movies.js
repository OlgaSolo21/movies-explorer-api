// пишем контроллеры для фильмов
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/400_BadRequest');
const ForbiddenError = require('../errors/403_ForbiddenError');
const NotFoundError = require('../errors/404_NotFoundError');
const {
  MESSAGE_BADREQUESTERROR,
  STATUS_OK,
  MESSAGE_NOTFOUNDERROR,
  MESSAGE_FORBIDDENERROR,
  MESSAGE_STATUSOK,
} = require('../utils/constans');

// GET /movies - возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

// POST /movies - создаёт фильм с переданными в теле значениями
module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(MESSAGE_BADREQUESTERROR));
      } else { next(err); }
    });
};

// DELETE /movies/_id - удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params; // для адреса роута
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(MESSAGE_NOTFOUNDERROR));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(MESSAGE_FORBIDDENERROR));
      }
      return Movie.findByIdAndDelete(movieId)
        .then(() => { res.status(STATUS_OK).send({ message: MESSAGE_STATUSOK }); });
    })
    .catch(next);
};
