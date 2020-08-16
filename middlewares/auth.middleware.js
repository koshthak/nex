const jwt = require('jsonwebtoken');

const User = require('../models/users.model');
const { errorObj } = require('../utils');
const STATUS = require('../constants/statusCodes.constant');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY_SECRET);
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res
      .status(STATUS.UNAUTHORIZED)
      .send(errorObj(STATUS.UNAUTHORIZED, 'Not authorized to access this resource', 'Unauthorized', 'Invalid token'));
  }
};

module.exports = auth;
