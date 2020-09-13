const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

let envFilePath = '';
if (fs.existsSync(`./.env.${process.env.NODE_ENV}`)) {
  envFilePath = `./.env.${process.env.NODE_ENV}`;
} else if (fs.existsSync('./.env')) {
  envFilePath = './.env';
} else {
  throw new Error('no env file found');
}

dotenv.config({
  path: path.join(__dirname, envFilePath),
});
