const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const authRouter = require('./auth.route');
const userRouter = require('./users.route');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/user', authMiddleware, userRouter);

module.exports = router;
