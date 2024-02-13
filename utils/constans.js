const STATUS_OK = 201;
const ERROR_BADREQUEST = 400;
const ERROR_AUTHORISATION = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_NOTFOUND = 404;
const ERROR_CONFLICT = 409;
const ERROR_CENTER = 500;
const ERROR_CODENUMBER = 11000;

const MESSAGE_BADREQUESTERROR = 'Данные введены некорректно';
const MESSAGE_NOTFOUNDERROR = 'Объект с запрашиваемыми данными не найден';
const MESSAGE_FORBIDDENERROR = 'Данные другого пользователя, их нельзя удалить';
const MESSAGE_STATUSOK = 'Успешно';
const MESSAGE_CONFLICTERROR = 'Пользователь с таким email уже существует';
const MESSAGE_AUTHORISATION = 'Необходима авторизация';
const MESSAGE_CENTERDEFAULT = 'На сервере произошла ошибка';
const MESSAGE_AUTHERROR = 'Неправильная почта или пароль';

module.exports = {
  STATUS_OK,
  ERROR_BADREQUEST,
  ERROR_AUTHORISATION,
  ERROR_FORBIDDEN,
  ERROR_NOTFOUND,
  ERROR_CONFLICT,
  ERROR_CENTER,
  ERROR_CODENUMBER,
  MESSAGE_BADREQUESTERROR,
  MESSAGE_NOTFOUNDERROR,
  MESSAGE_FORBIDDENERROR,
  MESSAGE_STATUSOK,
  MESSAGE_CONFLICTERROR,
  MESSAGE_AUTHORISATION,
  MESSAGE_CENTERDEFAULT,
  MESSAGE_AUTHERROR,
};
