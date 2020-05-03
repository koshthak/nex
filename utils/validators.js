// To Validate req.body params
validateParams = (reqParams, requiredParams) => {
  let missingParams = [];
  let emptyParams = [];
  let isValid = true;
  requiredParams.forEach((param) => {
    if (!reqParams.hasOwnProperty(param)) {
      missingParams.push(param);
      isValid = false;
    } else if (reqParams[param] === '') {
      emptyParams.push(param);
      isValid = false;
    }
  });
  return { isValid, error: { missingParams, emptyParams } };
};

module.exports = {
  validateParams,
};
