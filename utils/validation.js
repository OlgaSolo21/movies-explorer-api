const { celebrate, Joi } = require('celebrate');

const urlRegex = /^(https?:\/\/(www\.)?([a-zA-z0-9-]){1,}\.?([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:/?#[]@!\$&'\(\)\*\+,;=])*)/;

module.exports.signUpValid = celebrate({ // ркгистрация
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signInValid = celebrate({ //  логин
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.patchUpdateUserValidate = celebrate({ // изменение данных профиля имя и email
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.postMovieValidate = celebrate({ // добавление нового фильма
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidate = celebrate({ // удаление фильма
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
