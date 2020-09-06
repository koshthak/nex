const jwt = require('jsonwebtoken');

const User = require('../models/users.model');
const { resObj } = require('../utils');
const STATUS = require('../constants/statusCodes.constant');

const authMiddleware = async (req, res, next) => {
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
    res.status(STATUS.UNAUTHORIZED).send(resObj.error('Unauthorized', 'Invalid token', { status: res.statusCode }));
  }
};

module.exports = authMiddleware;
