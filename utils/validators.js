// To Validate req.body params
validateParams = (reqParams, requiredParams) => {
  let missingParams = [];
  let emptyParams = [];
  requiredParams.forEach((param) => {
    if (!reqParams.hasOwnProperty(param)) {
      missingParams.push(param);
    } else if (reqParams[param] === "") {
      emptyParams.push(param);
    }
  });
  return { missingParams, emptyParams };
};

module.exports = {
  validateParams,
};
