// Custom Imports
const AppError = require('../utils/appError');
const dbHelper = require('../sqldb/db.helper');
const constants = require('../utils/constants');

/**
 * @description Request validation handler
 * @param {*} tableName holds the sequelize model name
 * @param {*} id holds the unique id
 * @param {*} message holds the message to be sent
 * @param {*} query holds the query parameter to execute
 */
exports.handleRequestValidation = async (
  tableName,
  id,
  message,
  query = {}
) => {
  const existingRecordCount = await dbHelper.getRecordCountByQuery(tableName, {
    where: {
      id,
      ...query,
    },
  });
  if (existingRecordCount === 0) {
    throw new AppError(
      'backend.messages.common.not_found',
      constants.STATUS_CODES.NOT_FOUND,
      constants.ERROR_CODES.NOT_FOUND,
      message
    );
  }
};

exports.validateRequestBody = async (req, res, next) => {
  // const {} = req.body;
  next();
};

exports.validateRequestQuery = async (req, res, next) => {
  // const {} = req.query;
  next();
};

exports.validateRequestParams = async (req, res, next, value) => {
  const { state_id } = req.params;
  if (state_id) {
    await this.checkStateId(state_id);
  }
  next();
};

exports.checkStateId = async (state_id) => {
  await this.handleRequestValidation(
    constants.TABLES.COUNTRY_STATE,
    state_id,
    'Country State'
  );
};
