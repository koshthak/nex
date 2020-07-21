const express = require('express');
const { signIn, signUp } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/login', signIn);

authRouter.post('/register', signUp);

module.exports = authRouter;
