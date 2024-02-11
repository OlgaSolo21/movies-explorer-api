// пишем контроллеры для фильмов
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/400_BadRequest');
const ForbiddenError = require('../errors/403_ForbiddenError');
const NotFoundError = require('../errors/404_NotFoundError');

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
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании фильма'));
      } else { next(err); }
    });
};

// DELETE /movies/_id - удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params; // для адреса роута
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(`Фильм с указанным _id: ${req.params.movieId} не найден`));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Фильм другого пользователя, его нельзя удалить'));
      }
      return Movie.findByIdAndDelete(movieId)
        .then(() => { res.status(200).send({ message: 'Фильм удален' }); });
    })
    .catch(next);
};
