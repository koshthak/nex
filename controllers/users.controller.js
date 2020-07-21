// const User = require('../models/user');

// View logged in user profile
const me = (req, res) => {
  req.user.password = undefined;
  req.user.tokens = undefined;
  res.status(200).send(req.user);
};

// Log user out of the application
const logout = async (req, res) => {
  try {
    req.user.tokens.pop(req.token);
    await req.user.save();
    res.status(200).send({ message: 'success' });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Log user out of all devices
const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(200).send({ message: 'success' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { me, logout, logoutAll };
