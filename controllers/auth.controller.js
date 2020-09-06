const STATUS = require('../constants/statusCodes.constant');
const User = require('../models/users.model');
const { resObj } = require('../utils');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();
    user.tokens = undefined;
    user.password = undefined;
    res.status(STATUS.OK).send(resObj.success({ user, token }));
  } catch (error) {
    res.status(error.status).send(error);
  }
};

const signUp = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = await user.generateAuthToken();
    res.status(STATUS.CREATED).send(resObj.success({ token, id: user._id }));
  } catch (error) {
    console.log(error);
    console.log(error.status);
    res.status(error.status).send(error);
  }
};

module.exports = { signIn, signUp };
