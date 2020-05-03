const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        throw new Error({ error: 'Invalid Email address' });
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
      if (value.length >= 4) {
        throw new Error('session active for 4 devices, logout first from any one device');
      }
    },
  },
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (error) {
    console.log('error :>> ', error);
  }
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function (key) {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (error) {
    console.log('error :>> ', error);
    return key === "signUp" ? null : {token:null, error: error.errors.tokens.message} 
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
    console.log('error :>> ', error);
    return
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
