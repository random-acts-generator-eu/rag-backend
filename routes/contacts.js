const express = require('express');

const { models } = require('../model/index');
const status = require('../utils/status');
const messages = require('../utils/messages');
const validateToken = require('../middleware/validateToken');
const capitalize = require('../utils/capitalize');

const routes = express.Router();

/*
[GET] - to /contacts
Send: a valid JWT in the headers
Receive: array of contcts for the user
*/
routes.get('/', validateToken, async (req, res) => {
  // get the user id from the decoded token
  const { payload } = req.decodedToken;
  try {
    // look up the user in DB and determine whether they exist
    const user = await models.User.findById(payload);
    if (user) {
      res.status(status.goodRequest).json(user.contacts);
    } else {
      res.status(status.badRequest).json(messages.userNoExist);
    }
  } catch (error) {
    console.error(error);
  }
});

/*
[POST] - to /acts
Send: a valid JWT in the headers and an object containing a firstName: string, lastName and level: string (Friend, Close Friend, or Best Friend)
Receive: updated array of conracts for the user
*/
routes.post('/', validateToken, async (req, res) => {
  // get the user id from the decoded token
  const { payload } = req.decodedToken;
  const { firstName, lastName, level } = req.body;
  const levels = ['Friend', 'Close Friend', 'Best Friend'];
  if (firstName && lastName && level) {
    const capLevel = capitalize(level);
    if (levels.includes(capLevel)) {
      try {
        // look up the user in DB and determine whether they exist
        const user = await models.User.findById(payload);
        if (user) {
          // add the act to the users acts
          user.contacts.push({ first_name: firstName, last_name: lastName, level: capLevel });
          await user.save();
          // pull the updated user from the database
          const updatedUser = await models.User.findById(payload);
          // return the update users acts array
          res.status(status.goodRequest).json(updatedUser.contacts);
        } else {
          res.status(status.badRequest).json(messages.userNoExist);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(status.badRequest).json(messages.invalidLevelContact);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnPostContact);
  }
});

module.exports = routes;
