const express = require('express');
const { signIn, signUp } = require('../controllers/auth.controller');

const authRouter = express.Router();

/**
 * @swagger
 *  /api/auth/login:
 *  post:
 *    description: login user
 *    responses:
 *      200:
 *        description: Success
 *    tags:
 *      - auth
 */
authRouter.post('/login', signIn);

/**
 * @swagger
 *  /api/auth/register:
 *  post:
 *    description: signup user
 *    responses:
 *      200:
 *        description: Success
 *    tags:
 *      - auth
 */
authRouter.post('/register', signUp);

module.exports = authRouter;
