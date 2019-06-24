const jwt = require('jsonwebtoken');

const status = require('../utils/status');
const messages = require('../utils/messages');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(status.badCredentials).json(messages.invalidToken);
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(status.badCredentials).json(messages.noToken);
  }
};

module.exports = validateToken;
