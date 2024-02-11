// Создаём схему и модель для сущности пользователя.
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const AuthorisationError = require('../errors/401_AuthorisationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина — 2 символа'],
    maxlength: [30, 'Максимальная длина — 30 символов'],
    required: {
      value: true,
      message: 'Поле name является обязательным',
    },
  },
  email: {
    type: String,
    required: {
      value: true,
      message: 'Поле email является обязательным',
    },
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Поле password является обязательным',
    },
    select: false,
  },
}, { versionKey: false, timestamps: true });

userSchema.statics.findUserByCredential = function findOne(email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email }).select('+password') // в случае аутентификации хеш пароля нужен
    .then((user) => {
      if (!user) { // не нашёлся — отклоняем промис
        throw new AuthorisationError('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password) // нашёлся — сравниваем хеши
        .then((matched) => {
          if (!matched) { // хеши не совпали — отклоняем промис
            throw new AuthorisationError('Неправильная почта или пароль');
          }
          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
