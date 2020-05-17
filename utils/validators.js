// To Validate req.body params
const validateParams = (reqParams, requiredParams) => {
  console.log('reqParams :>> ', reqParams);
  const missingParams = []; /* store  invalid params  */
  requiredParams.forEach((param) => {
    if (!reqParams[param]) {
      // check for missing or empty string, null or undefined
      missingParams.push(param);
    }
  });
  const isValid = !missingParams.length > 0;
  return { isValid, error: { missingParams } };
};

module.exports = { validateParams };
