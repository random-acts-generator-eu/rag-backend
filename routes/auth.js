const express = require('express');
const bcrypt = require('bcryptjs');

const createToken = require('../utils/createToken');
const { models } = require('../model/index');
const status = require('../utils/status');
const messages = require('../utils/messages');
const actsSeed = require('../data/actsSeed');
const capitalize = require('../utils/capitalize');
const validateEmail = require('../utils/validateEmail');

const routes = express.Router();

routes.post('/register', async (req, res) => {
  let { firstName, lastName, email, phone, password } = req.body;
  if (firstName && lastName && email && phone && password) {
    if (validateEmail(email)) {
      try {
        // hash the password with bcrypt
        password = bcrypt.hashSync(password, 10);
        // move these formating pieces into middleware
        const user = await models.User.create({
          first_name: capitalize(firstName),
          last_name: capitalize(lastName),
          email: email.toLowerCase(),
          phone,
          password,
          acts: actsSeed,
        });
        // generate token
        const token = createToken({ id: user.id, firstName, email });
        // return token and other needed info to user
        res.status(status.creationSuccess).json({ user, token });
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(status.badRequest).json(messages.invalidEmail);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnRegister);
  }
});

// ROUTE FOR LOGIN AT '/LOGIN'

module.exports = routes;
