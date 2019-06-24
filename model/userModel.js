const mongoose = require('mongoose');
const mn = require('../utils/modelNames');

const actSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
});

const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Friend', 'Close Friend', 'Best Friend'],
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contacts: [contactSchema],
  acts: [actSchema],
});

const User = mongoose.model(mn.User, userSchema);

module.exports = User;
