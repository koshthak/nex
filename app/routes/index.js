var express = require("express");
var authRouter = require("./Auth");

var app = express();

app.use("/auth/", authRouter);

module.exports = app;
