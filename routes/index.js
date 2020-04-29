var express = require('express');
const authMiddleware = require('../middlewares/auth');

const authRouter = require('./auth');
const userRouter = require('./user');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/user', authMiddleware, userRouter);

module.exports = router;
