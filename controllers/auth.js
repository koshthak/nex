const User = require('../models/user');
const { validators, errorObj } = require('../utils');

const signIn = async (req, res) => {
  try {
    const { isValid, error } = await validators.validateParams(req.body, ['email', 'password']);
    if (!isValid) {
      throw errorObj('Username or Password cannot be empty', 'invalid params', '', error);
    }

    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send(errorObj('Login Failed', 'Unauthorized', 'Invalid authentication credentials'));
    }

    const token = await user.generateAuthToken();
    user.tokens = undefined;
    user.password = undefined;
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { isValid, error } = await validators.validateParams(req.body, ['name', 'email', 'password']);
    if (!isValid) {
      throw errorObj('Failed to register user', 'invalid params', '', error);
    }

    const user = await new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { signIn, signUp };
