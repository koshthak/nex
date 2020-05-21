const config = {
  url: process.env.DB_URL,
  port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

module.exports = config;
