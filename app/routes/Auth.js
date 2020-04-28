var express = require("express");
const AuthController = require("../controllers/Auth");

var router = express.Router();

router.post("/signin", AuthController.signin);

module.exports = router;
