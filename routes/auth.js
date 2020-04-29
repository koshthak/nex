var express = require("express");
const { signIn, signUp }  = require("../controllers/auth");

var authRouter = express.Router();

authRouter.post("/login", signIn);

authRouter.post("/register", signUp);

module.exports = authRouter;
