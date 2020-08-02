const express = require('express');
const { me, logout, logoutAll } = require('../controllers/users.controller');

const userRouter = express.Router();

/**
 * @swagger
 *  /api/user/me:
 *  get:
 *    description: req user detail
 *    responses:
 *      200:
 *        description: Success
 *    tags:
 *      - user
 */
userRouter.get('/me', me);

/**
 * @swagger
 *  /api/user/logout:
 *  post:
 *    description: logout from current session
 *    responses:
 *      200:
 *        description: Success
 *    tags:
 *      - user
 */
userRouter.post('/logout', logout);

/**
 * @swagger
 *  /api/user/logoutall:
 *  post:
 *    description:  logout from all session
 *    responses:
 *      200:
 *        description: Success
 *    tags:
 *      - user
 */
userRouter.post('/logoutall', logoutAll);

module.exports = userRouter;
