const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { winston, errorObj } = require('../utils');
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
      if (!validator.isEmail(value)) {
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
      console.log(user);
      const salt = bcrypt.genSaltSync(process.env.token);
      user.password = bcrypt.hashSync(user.password, salt);
    }
    next();
  } catch (error) {
    winston.error('error in Password hasing: ', error);
    throw errorObj(STATUS.INTERNAL_SERVER_ERROR, 'Error in Password hasing', 'Error in Password hasing', error.message);
  }
});

// post save error validation
userSchema.post('save', function (error, doc, next) {
  if (error) {
    winston.error('error in saving data: ', error);
    switch (error.name) {
      case 'MongoError':
        if (error.code === 11000) {
          throw errorObj(STATUS.BAD_REQUEST, 'Already registered', error.type || error.name, error.message);
        }
        throw errorObj(STATUS.BAD_REQUEST, 'MongoError', error.type || error.name, error.message);
      case 'ValidationError': {
        const errorsKeys = Object.keys(error.errors) || [];
        const errorReasons = errorsKeys.map((key) => error.errors[key].reason);
        throw errorObj(STATUS.BAD_REQUEST, 'invalid params', error.message, error.type || error.name, {
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
    winston.error('error in genrating token: ', error);
    throw errorObj(
      STATUS.INTERNAL_SERVER_ERROR,
      'Failed to genrate Auth Token',
      error.type || error.name,
      error.message
    );
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
      return;
    }
    return user;
  } catch (error) {
    winston.error('error in validating user: ', error);
    throw errorObj(STATUS.BAD_REQUEST, 'Failed to validating user', error.type, error.message);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
