// To Validate req.body params
const validateParams = (reqParams, requiredParams) => {
  const invalidParams = []; /* store  invalid params  */
  requiredParams.forEach((param) => {
    if (!reqParams[param]) {
      // check for missing or empty string, null or undefined
      invalidParams.push(param);
    }
  });
  const isValid = !invalidParams.length > 0;
  return { isValid, error: { params: invalidParams } };
};

module.exports = { validateParams };
