// пишем контроллеры для юзера
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем jwt token модуль
const User = require('../models/user');
const BadRequest = require('../errors/400_BadRequest');
const ConflictError = require('../errors/409_ConflictError');
const NotFoundError = require('../errors/404_NotFoundError');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const {
  ERROR_CODENUMBER,
  MESSAGE_CONFLICTERROR,
  MESSAGE_BADREQUESTERROR,
  STATUS_OK,
  MESSAGE_NOTFOUNDERROR,
} = require('../utils/constans');

// POST /signup — создаёт пользователя с переданными в теле email, password и name
module.exports.signupUser = (req, res, next) => { // создаем пользователя User.create
  const { name, password, email } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.status(STATUS_OK).send({ // В ответе убираем password
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === ERROR_CODENUMBER) {
        next(new ConflictError(MESSAGE_CONFLICTERROR));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(MESSAGE_BADREQUESTERROR));
      } else {
        next(err);
      }
    });
};

// POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
module.exports.signinUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign( // создадим токен
        { _id: user._id },
        NODE_ENV ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token }); // вернём токен
    })
    .catch(next);
};

// GET /users/me - возвращает информацию о текущем пользователе
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(STATUS_OK).send(user))
    .catch(next);
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserProfile = (req, res, next) => { // обновляем профиль User.findByIdAndUpdate
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(MESSAGE_NOTFOUNDERROR));
        return;
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(MESSAGE_BADREQUESTERROR));
      } else if (err.code === ERROR_CODENUMBER) {
        next(new ConflictError(MESSAGE_CONFLICTERROR));
      } else { next(err); }
    });
};
