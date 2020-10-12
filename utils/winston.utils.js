const path = require('path');
const winston = require('winston');

const logFormat = (data) => `${data.timestamp} - ${data.level}: ${data.message}`;

const errorFormat = winston.format.printf((err) => `${logFormat(err)}\n${err.stack}`);

const customFormat = winston.format.printf((info) => logFormat(info));

// define the custom settings for each transport (file, console, error)
const options = {
  file: {
    filename: path.join(__dirname, './../logs/app.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json(), customFormat),
  },
  error: {
    level: 'error',
    filename: path.join(__dirname, './../logs/error.log'),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json(), errorFormat),
  },
  console: {
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.printf((log) => `${log.level}: ${log.message}${log.stack ? '\n' + log.stack : ''}`)
    ),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file), new winston.transports.File(options.error)],
  exitOnError: false, // do not exit on handled exceptions
});

// If we're not in production/staging then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'dev') {
  logger.add(new winston.transports.Console(options.console));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: (message) => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
