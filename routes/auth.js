var express = require("express");
const { signIn, signUp }  = require("../controllers/auth");

var router = express.Router();

router.post("/login", signIn);

router.post("/register", signUp);

module.exports = router;
