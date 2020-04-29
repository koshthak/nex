var express = require("express");
const { me, logout, logoutAll } = require("../controllers/auth");

var router = express.Router();

router.get("/me", me);

router.post("/logout", logout);

router.post("/logoutall", logoutAll);

module.exports = router;
