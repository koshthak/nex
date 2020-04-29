var express = require("express");
const authMiddleware = require("../middleware/auth");

const authRouter = require("./user");
const userRouter = require("./user");

const router = express.Router();

router.use("/auth", authRouter);

router.use("/user", authMiddleware, userRouter);

module.exports = app;
