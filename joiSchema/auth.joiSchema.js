const Joi = require('joi');

const signUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).with('name', ['email', 'password']);

const signIn = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
  .with('email', 'password');

module.exports = { signUp, signIn };
