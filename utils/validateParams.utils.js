const errorObj = require('./errorObj.utils');
const STATUS = require('../constants/statusCodes.constant');

const validateParams = (reqParam, requiredParams, message = '') => {
  const invalidParams = []; /* store  invalid params  */
  requiredParams.forEach((param) => {
    if (typeof reqParam[param] !== 'boolean' && !reqParam[param]) {
      // check for missing or empty string, null or undefined
      invalidParams.push(param);
    }
  });
  if (invalidParams.length > 0) {
    throw errorObj(STATUS.UNPROCESSABLE_ENTITY, message || 'required or empty params', 'invalid params', '', {
      params: invalidParams,
    });
  }
};

module.exports = validateParams;
