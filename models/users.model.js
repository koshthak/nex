const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { logger, resObj } = require('../utils');
const STATUS = require('../constants/statusCodes.constant');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!Joi.string().email().validate(value)) {
        throw 'Invalid Email address';
      }
    },
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: {
    type: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    validate: (value) => {
      if (value.length > 4) {
        throw 'session active for 4 devices, logout first from any one device';
      }
    },
  },
});

// Hash the password before saving the user model
userSchema.pre('save', function (next) {
  try {
    const user = this;
    if (user.isModified('password')) {
      const salt = bcrypt.genSaltSync(process.env.token);
      user.password = bcrypt.hashSync(user.password, salt);
    }
    next();
  } catch (error) {
    logger.error('error in Password hasing: ', error);
    throw resObj.error('Error in Password hasing', error.message);
  }
});

// post save error validation
userSchema.post('save', function (error, doc, next) {
  if (error) {
    logger.error('error in saving data: ', error);
    switch (error.name) {
      case 'MongoError':
        if (error.code === 11000) {
          throw resObj.error('duplicate entry', 'user already exists', { status: STATUS.CONFILCT });
        }
        throw resObj.error(error.type || error.name, error.message, { status: STATUS.BAD_REQUEST });
      case 'ValidationError': {
        const errorsKeys = Object.keys(error.errors) || [];
        const errorReasons = errorsKeys.map((key) => error.errors[key].reason);
        throw resObj.error(error.type || error.name, error.message, {
          status: STATUS.UNPROCESSABLE_ENTITY,
          reasons: errorReasons,
        });
      }
    }
    throw error;
  }
  next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (error) {
    logger.error('error in genrating token: ', error);
    throw resObj.error(error.type || error.name, error.message);
  }
};

// Search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw resObj.error('Unauthorized', 'Email or Password is invalid', { status: STATUS.UNAUTHORIZED });
    }
    return user;
  } catch (error) {
    logger.error('error in validating user: ', error);
    throw resObj.error(error.type, error.message);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
