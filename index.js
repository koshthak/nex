try {
  // start the server
  const app = require('./app');
  app.startServer();
} catch (e) {
  // catch all error and log them
  const logger = require('./utils/winston.utils');
  logger.error('error in starting the server: ', e);
}
