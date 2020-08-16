const STATUS = require('../constants/statusCodes.constant');
const User = require('../models/users.model');
const { validateParams, errorObj } = require('../utils');

const signIn = async (req, res) => {
  try {
    validateParams(req.body, ['email', 'password'], 'Username or Password cannot be empty');
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      throw errorObj(
        STATUS.UNAUTHORIZED,
        'Email or Password is invalid',
        'Unauthorized',
        'Invalid authentication credentials'
      );
    }

    const token = await user.generateAuthToken();
    user.tokens = undefined;
    user.password = undefined;
    res.status(STATUS.OK).send({ data: { user, token }, message: 'success' });
  } catch (error) {
    res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
};

const signUp = async (req, res) => {
  try {
    validateParams(req.body, ['name', 'email', 'password'], 'Failed to register user');
    const user = await new User(req.body).save();
    const token = await user.generateAuthToken();
    res.status(STATUS.CREATED).send({ message: 'sucessfully created', data: { token, id: user._id } });
  } catch (error) {
    res.status(error.status || STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = { signIn, signUp };
