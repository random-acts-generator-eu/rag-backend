const express = require('express');

const { models } = require('../model/index');
const status = require('../utils/status');
const messages = require('../utils/messages');
const validateToken = require('../middleware/validateToken');
const capitalize = require('../utils/capitalize');
const levels = require('../utils/levels');

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
    res.status(status.serverError).json({ mesage: error });
  }
});

/*
[POST] - to /acts
Send: a valid JWT in the headers and an object containing a firstName: string, lastName and level: string (Friend, Close Friend, or Best Friend)
Receive: updated array of contacts for the user
*/
routes.post('/', validateToken, async (req, res) => {
  // get the user id from the decoded token
  const { payload } = req.decodedToken;
  const { firstName, lastName, level } = req.body;
  if (firstName && lastName && level) {
    const capLevel = capitalize(level);
    if (levels.contacts.includes(capLevel)) {
      try {
        // look up the user in DB and determine whether they exist
        const user = await models.User.findById(payload);
        if (user) {
          // add the act to the users acts
          user.contacts.push({
            first_name: capitalize(firstName),
            last_name: capitalize(lastName),
            level: capLevel,
          });
          await user.save();
          // pull the updated user from the database
          const updatedUser = await models.User.findById(payload);
          // return the update users acts array
          res.status(status.creationSuccess).json(updatedUser.contacts);
        } else {
          res.status(status.badRequest).json(messages.userNoExist);
        }
      } catch (error) {
        res.status(status.serverError).json({ mesage: error });
      }
    } else {
      res.status(status.badRequest).json(messages.invalidLevelContact);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnPostContact);
  }
});

/*
[PUT] - to /contacts
Send: a valid JWT in the headers, a contactID in params, and a body with firstNamme: string and/or  lastName: string and/or level: string (Friend, Close Friend, or Best Friend)
Receive: updated array of contacts for the user
*/
routes.put('/:contactID', validateToken, async (req, res) => {
  const { payload } = req.decodedToken;
  const { contactID } = req.params;
  const { firstName, lastName, level } = req.body;
  const levels = ['Friend', 'Close Friend', 'Best Friend'];
  if (firstName || lastName || level) {
    if (!level || levels.includes(capitalize(level))) {
      try {
        // check if the user exists and/or the act exists
        const user = await models.User.findById(payload);
        if (user) {
          // check if the act within the user exists
          let contact = await user.contacts.id(contactID);
          if (contact) {
            // change the first_name for the contact if its included in the request
            if (firstName) {
              contact.first_name = capitalize(firstName);
            }
            // change the last_name for the contact if its included in the request
            if (lastName) {
              contact.last_name = capitalize(lastName);
            }
            // change the level for the contact if its included in the request
            if (level) {
              contact.level = capitalize(level);
            }
            await user.save();
            const updatedUser = await models.User.findById(payload);
            res.status(status.goodRequest).json(updatedUser.contacts);
          } else {
            res.status(status.badRequest).json(messages.contactNoExist);
          }
        } else {
          res.status(status.badRequest).json(messages.userNoExist);
        }
      } catch (error) {
        res.status(status.serverError).json({ mesage: error });
      }
    } else {
      res.status(status.badRequest).json(messages.invalidLevelContact);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnPutContact);
  }
});

/*
[DELETE] - to /contacts
Send: a valid JWT in the headers and a contactID in params
Receive: updated array of contacts for the user
*/
routes.delete('/:contactID', validateToken, async (req, res) => {
  const { payload } = req.decodedToken;
  const { contactID } = req.params;
  try {
    // check if the user exists
    const user = await models.User.findById(payload);
    if (user) {
      // check if the contact within the user exists
      let contact = await user.contacts.id(contactID);
      if (contact) {
        // delete the act
        await contact.remove();
        await user.save();
        const updatedUser = await models.User.findById(payload);
        res.status(status.goodRequest).json(updatedUser.contacts);
      } else {
        res.status(status.badRequest).json(messages.contactNoExist);
      }
    } else {
      res.status(status.badRequest).json(messages.userNoExist);
    }
  } catch (error) {
    res.status(status.serverError).json({ mesage: error });
  }
});

module.exports = routes;
