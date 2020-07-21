const User = require('../models/users.model');
const { validatorParams, errorObj } = require('../utils');

const signIn = async (req, res) => {
  try {
    validatorParams(req.body, ['email', 'password'], 'Username or Password cannot be empty');
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
    validatorParams(req.body, ['name', 'email', 'password'], 'Failed to register user');
    const user = await new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { signIn, signUp };
