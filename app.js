const express = require("express");
const routes = require("./app/routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/database");
const serverConfig = require("./config/server");
const apiResponse = require("./app/utils/responder");
const buildInfo = require("./app/utils/buildInfo").getBuildInfo();

// App Mode === local/staging/production
let appMode = buildInfo.appMode;

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// DB connection
mongoose.Promise = global.Promise;

// Connecting to the database
dbConfigObj = dbConfig["config"][appMode];

// For Staging/Production with Database Password
// const dbURL = `${dbConfigObj.username}:${dbConfigObj.password}@${dbConfigObj.url}:${dbConfigObj.port}/${dbConfigObj.db_name}`;

// For Local Development without Database Password
const dbURL = `${dbConfigObj.url}:${dbConfigObj.port}/${dbConfigObj.db_name}`;

mongoose
  .connect(dbURL, dbConfigObj.options)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });


//Route Prefixes
app.use("/api/", routes);

// throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "Page not found/ Wrong URL");
});

app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

serverConfigObj = serverConfig["config"][appMode];

// listen for requests
app.listen(serverConfigObj.port, () => {
  console.log(`Server is listening on port ${serverConfigObj.port}`);
});
