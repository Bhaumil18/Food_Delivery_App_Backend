const BadRequestError = require("./BadRequestError");

class CustomApiError extends BadRequestError {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = CustomApiError
