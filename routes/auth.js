const express = require('express');
const bcrypt = require('bcryptjs');

const createToken = require('../utils/createToken');
const { models } = require('../model/index');
const status = require('../utils/status');
const messages = require('../utils/messages');
const actsSeed = require('../data/actsSeed');
const capitalize = require('../utils/capitalize');
const validateEmail = require('../utils/validateEmail');
const validatePassword = require('../utils/validatePassword');

const routes = express.Router();

/*
[POST] - to /auth/register
Send: body with firstName, lastName, email (valid), phone number, and password (at lest 7 characters)
Receive: object containing a user and a jwt token
*/
routes.post('/register', async (req, res) => {
  let { firstName, lastName, email, phone, password } = req.body;
  // if all required fields have been sent over
  if (firstName && lastName && email && phone && password) {
    // if the email address provided is a valid email
    if (validateEmail(email)) {
      // if the password is at least 7 charcters
      if (validatePassword(password)) {
        try {
          // hash the password with bcrypt
          password = bcrypt.hashSync(password, 10);
          // format names to first char capitalize and email to lower case
          const user = await models.User.create({
            first_name: capitalize(firstName),
            last_name: capitalize(lastName),
            email: email.toLowerCase(),
            phone,
            password,
            // include the seeded set of acts for new users
            acts: actsSeed,
          });
          // generate jwt token
          const token = createToken({ id: user.id, firstName, email });
          // return token and user info
          res.status(status.creationSuccess).json({ user, token });
        } catch (error) {
          console.error(error);
        }
      } else {
        res.status(status.badRequest).json(messages.invalidPassword);
      }
    } else {
      res.status(status.badRequest).json(messages.invalidEmail);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnRegister);
  }
});

/*
[POST] - to /auth/login
Send: body with valid email and password combination
Receive: object containing the user and a jwt token
*/
routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // if all require fields have been sent over
  if (email && password) {
    try {
      // check to see whether a user exists with this email
      const [user] = await models.User.where({ email: email.toLowerCase() });
      // if the user exists and the password matches
      if (user && bcrypt.compareSync(password, user.password)) {
        // crete a token with the id, name, and email
        const { id, first_name, email } = user;
        const token = createToken({ id, firstName: first_name, email });
        // remove the pasword for response
        user.password = undefined;
        // return token and user info
        res.status(status.goodRequest).json({ user, token });
      } else {
        res.status(status.badCredentials).json(messages.invalidCredentials);
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnLogin);
  }
});

module.exports = routes;
