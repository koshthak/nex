const express = require('express');
const { me, logout, logoutAll } = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/me', me);

userRouter.post('/logout', logout);

userRouter.post('/logoutall', logoutAll);

module.exports = userRouter;
