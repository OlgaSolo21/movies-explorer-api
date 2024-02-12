const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/401_AuthorisationError');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const { MESSAGE_AUTHORISATION } = require('../utils/constans');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorisationError(MESSAGE_AUTHORISATION));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorisationError(MESSAGE_AUTHORISATION));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
