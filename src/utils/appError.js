const {
  ERROR_TYPES: { FAIL, ERROR },
} = require('./constants');

class AppError extends Error {
  constructor(message, statusCode, errorCode, meta) {
    super(message);
    this.statusCode = statusCode;
    this.code = errorCode;
    this.status = `${statusCode}`.startsWith('4') ? FAIL : ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
