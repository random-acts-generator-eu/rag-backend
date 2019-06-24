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
Send: body with firstName, lastName, email, phone number, and password
Receive: object containing a user and a jwt token
*/
routes.post('/register', async (req, res) => {
  let { firstName, lastName, email, phone, password } = req.body;
  // if all require fields have been sent over
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

// ROUTE FOR LOGIN AT '/LOGIN'
//

module.exports = routes;
