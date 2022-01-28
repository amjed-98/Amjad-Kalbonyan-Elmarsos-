const mongoose = require('mongoose');
const { isEmail, isStrongPassword } = require('validator');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    password: {
      type: String,
      required: true,
      trim: true,

      validate(value) {
        if (!isStrongPassword(value))
          throw new Error('provide a a stronger password');
      },
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,

      validate(value) {
        if (!isEmail(value)) throw new Error('Email is not  valid');
      },
    },

    age: {
      type: Number,
      default: 14,

      validate(value) {
        if (value <= 13) throw new Error('Invalid age, must be  13 or above');
      },
    },

    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
    avatar: { type: Buffer },
  },
  { timestamps: true }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

// not exposing password or token to user
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// generate token
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY
  );

  user.tokens = [...user.tokens, { token }];

  await user.save();

  return token;
};

// login method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('unable to login');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('unable to login');

  return user;
};

// hash plain text password before saving
userSchema.pre('save', async function (next) {
  // * using a regular func cause of this bind
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// delete user tasks when user deleted
userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
