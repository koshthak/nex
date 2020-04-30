const User = require('../models/user');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
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
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { signIn, signUp };
