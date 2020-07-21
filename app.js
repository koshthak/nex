const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const Ddos = require('ddos');
const morgan = require('morgan');
const path = require('path');

// loading env variables
const envTYpe = process.env.NODE_ENV === 'production' ? '' : '.' + process.env.NODE_ENV;
require('dotenv').config({ path: path.join(__dirname, './.env' + envTYpe) });

// IMP: local file imaport after loading env varible
const routes = require('./routes');
const { winston } = require('./utils');
const { corsConfig, ddosConfig, dbConfig } = require('./config');

const app = express();

// npm module for preventing ddos attack. See more https://www.npmjs.com/package/ddos
const ddosInstance = new Ddos(ddosConfig);
app.use(ddosInstance.express);

// parse body params and attache them to req.body
app.use(bodyParser.json()); /* application/json */
app.use(bodyParser.urlencoded({ extended: true })); /* application/x-www-form-urlencoded */

// gzip compression
app.use(compress());

// secure servers by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsConfig));

// connection to database
mongoose
  .connect(dbConfig.url, dbConfig.options)
  .then(() => {
    winston.info('Successfully connected to the database');
  })
  .catch((err) => {
    winston.error('Could not connect to the database. Exiting now...', err);
  });

// morgan, winston logger
app.use(morgan('combined', { stream: winston.stream }));

// Route Prefixes
app.use('/api', routes);

// server ping
app.get('/', (req, res) => res.status(200).json({ message: 'server is running' }));

// throw 404 if URL not found
app.all('*', function (req, res) {
  res.status(404).json({ message: 'API not found' });
});

// listen for requests
app
  .listen(process.env.PORT || 3000, (port) => {
    winston.info(`Server is listening on port ${port}`);
  })
  .on('error', (err) => {
    winston.error('error in starting the server ', err);
  });
