const STATUS = require('../constants/statusCodes.constant');

const error = (type, message, other = {}) => {
  return { status: other.status || STATUS.INTERNAL_SERVER_ERROR, type, message, ...other };
};

const success = (data, message = 'success', other = {}) => {
  return { status: other.status || STATUS.OK, message, data: data, ...other };
};

module.exports = { error, success };
