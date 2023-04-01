//
const errorCodes = {
  OK: 'OK',
  CREATED: 'CREATED',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
//
const errorTypes = {
  FAIL: 'fail',
  SUCESS: 'success',
  ERROR: 'error',
};
//
const statusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Application constants
module.exports = {
  ERROR_CODES: errorCodes,
  ERROR_TYPES: errorTypes,
  STATUS_CODES: statusCodes
};
