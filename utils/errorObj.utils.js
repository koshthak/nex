/**
 * @param {string} errorHeading - the heading of the error
 * @param {string} errorType - error type
 * @param {string} errorMessage - error message
 * @param {any} other - any extra info need to send
 *
 * @returns {Object} - error object to send in response to user
 */

const errObh = (errorHeading, errorType, errorMessage, other) => {
  return { errorHeading, error: { type: errorType, message: errorMessage, ...other } };
};

module.exports = errObh;
