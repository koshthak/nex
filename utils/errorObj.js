const sendObj = (message, errorType, errorMessage, other) => {
  return { message, error: { type: errorType, message: errorMessage, ...other } };
};

module.exports = sendObj;
