const { resObj } = require('../utils');
const STATUS = require('../constants/statusCodes.constant');

const joiMiddleware = (schema, type = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[type]);
  if (error) {
    const { details } = error;
    const errorsDetail = details.map((i) => i.message);

    return res
      .status(STATUS.UNPROCESSABLE_ENTITY)
      .json(resObj.error('Invalid params ', errorsDetail, { status: res.statusCode }));
  }
  next();
};

module.exports = joiMiddleware;
