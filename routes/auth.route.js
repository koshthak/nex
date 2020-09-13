const express = require('express');

const joiMiddleware = require('../middlewares/joi.middleware');
const { authSchema } = require('../joiSchema');
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
authRouter.post('/login', joiMiddleware(authSchema.signIn), signIn);

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
authRouter.post('/register', joiMiddleware(authSchema.signUp), signUp);

module.exports = authRouter;
