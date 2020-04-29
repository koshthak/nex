// const User = require('../models/user');

// View logged in user profile
const me = (req, res) => {
  res.send(req.user);
};

// Log user out of the application
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Log user out of all devices
const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { me, logout, logoutAll };
