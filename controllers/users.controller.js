const STATUS = require('../constants/statusCodes.constant');
const { resObj } = require('../utils');

// View logged in user profile
const me = (req, res) => {
  req.user.password = undefined;
  req.user.tokens = undefined;
  res.status(STATUS.OK).send(resObj.success(req.user));
};

// Log user out of the application
const logout = async (req, res) => {
  try {
    req.user.tokens.pop(req.token);
    await req.user.save();
    res.status(STATUS.OK).send(resObj.success());
  } catch (error) {
    res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
};

// Log user out of all devices
const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(STATUS.OK).send(resObj.success());
  } catch (error) {
    res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = { me, logout, logoutAll };
