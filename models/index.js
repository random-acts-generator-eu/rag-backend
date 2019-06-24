const mongoose = require('mongoose');
// const User = require('./userModels');
// const Act = require('./actModels');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const connectDb = () => {
    console.log(process.env.DATABASE_URL)
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

// const models = { User, Act };

module.exports = {
    connectDb,
    // models
}