const { ERROR_BADREQUEST } = require('../utils/constans');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BADREQUEST;
  }
}
module.exports = BadRequest;
