const mongoose = require('mongoose');
// const User = require('./userModel');
// const Act = require('./actModel');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

// const models = { User, Act };

module.exports = {
    connectDb,
    // models
}