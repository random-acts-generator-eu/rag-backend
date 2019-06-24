const jwt = require('jsonwebtoken');

const createToken = ({ id, firstName, email }) =>
  jwt.sign({ payload: id, firstName, email }, process.env.JWT_SECRET);

module.exports = createToken;
