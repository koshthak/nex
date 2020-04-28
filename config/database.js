let config = {
  local: {
    url: "mongodb://localhost",
    port: "27017",
    db_name: "food_delivery",
    username: "admin",
    password: "admin",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
  staging: {
    url: "mongodb://localhost",
    port: "27017",
    db_name: "food_delivery",
    username: "admin",
    password: "admin",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
  production: {
    url: "mongodb://localhost",
    port: "27017",
    db_name: "food_delivery",
    username: "admin",
    password: "admin",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
};

module.exports = {
  config,
};
