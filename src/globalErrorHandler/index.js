// Internal Imports
const util = require('util');

// Custom Imports
const {
    ERROR_TYPES: { ERROR },
    STATUS_CODES,
    ERROR_CODES,
} = require('../utils/constants');


module.exports = (err, req, res, next) => {
    console.error(util.format(`Error occured, ERROR: %O`, err));
    err.statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
    err.status = err.status || ERROR;
    err.errorCode = err.code || ERROR_CODES.INTERNAL_SERVER_ERROR;
    return res.status(err.statusCode).json({
        status: err.status,
        code: err.errorCode,
        message: err.message || "",
    });
};
