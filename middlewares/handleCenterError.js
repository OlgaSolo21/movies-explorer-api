const { ERROR_CENTER, MESSAGE_CENTERDEFAULT } = require('../utils/constans');

module.exports.handleCenterError = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === ERROR_CENTER
      ? MESSAGE_CENTERDEFAULT
      : message,
  });
  next();
};
