const { ERROR_AUTHORISATION } = require('../utils/constans');

class AuthorisationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_AUTHORISATION;
  }
}

module.exports = AuthorisationError;
