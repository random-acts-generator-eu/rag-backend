const paths = require('../utils/paths');
const auth = require('./auth');
const acts = require('./acts');
const contacts = require('./contacts');

module.exports = server => {
  server.get('/', (req, res) => {
    res.status(200).json({ message: 'Alive!' });
  });

  server.use(paths.auth, auth);
  server.use(paths.acts, acts);
  server.use(paths.contacts, contacts);
};
