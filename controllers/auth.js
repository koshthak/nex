const User = require('../models/user');
const { validators } = require('../utils');

const signIn = async (req, res) => {
  try {
    const { isValid, error } = await validators.validateParams(req.body, ['email', 'password']);
    if (!isValid) {
      throw { message: 'Username or Password cannot be empty', error };
    }

    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ message: 'Login Failed', error: 'Invalid authentication credentials' });
    }

    const { token, error: err } = await user.generateAuthToken('signIn');
    if (err) {
      return res.status(403).send({ message: 'Login Failed', err });
    }
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
      throw { message: 'Failed to Register User', error };
    }

    // Check for User is already registered
    const isUserReg = await User.findOne({ email: req.body.email });

    if (isUserReg) {
      return res.status(403).send({ message: 'Failed to Register User', error: 'User is already registered' });
    }

    const user = await new User(req.body);
    const token = await user.generateAuthToken('signUp');
    if (!token) {
      throw new Error('Token Generation Failed.');
    }
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Failed to Register User', error });
  }
};

module.exports = { signIn, signUp };
