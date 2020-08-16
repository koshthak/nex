/**
 * @param {string} status - the heading of the error
 * @param {string} heading - the heading of the error
 * @param {string} type - error type
 * @param {string} message - error message
 * @param {any} other - any extra info need to send
 *
 * @returns {Object} - error object to send in response to user
 */

const errObj = (status, heading, type, message, other) => {
  return { status, message: heading, error: { type, message: message, ...other } };
};

module.exports = errObj;
