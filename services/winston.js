const path = require('path');
const winston = require('winston');

// define the custom settings for each transport (file, console, error)
const options = {
  file: {
    level: 'info',
    filename: path.join(__dirname, './../logs/app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  error: {
    level: 'error',
    name: 'file.error',
    filename: path.join(__dirname, './../logs/error.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
  },
  console: {
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [new winston.transports.File(options.error), new winston.transports.File(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
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
