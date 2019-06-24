require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./userModel');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { User };

module.exports = {
  connectDb,
  models,
};
