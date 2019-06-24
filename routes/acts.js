const express = require('express');

const paths = require('../utils/paths');
const { models } = require('../model/index');
const status = require('../utils/status');
const messages = require('../utils/messages');
const validateToken = require('../middleware/validateToken');
const capitalize = require('../utils/capitalize');

const routes = express.Router();

/*
[GET] - to /acts
Send: a valid JWT in the headers
Receive: array of acts for the user
*/
routes.get('/', validateToken, async (req, res) => {
  // get the user id from the decoded token
  const { payload } = req.decodedToken;
  try {
    // look up the user in DB and determine whether they exist
    const user = await models.User.findById(payload);
    if (user) {
      res.status(status.goodRequest).json(user.acts);
    } else {
      res.status(status.badRequest).json(messages.userNoExist);
    }
  } catch (error) {
    console.error(error);
  }
});

/*
[POST] - to /acts
Send: a valid JWT in the headers and an object containing a description: string and level: string (Easy, Medium, or Hard)
Receive: updated array of acts for the user
*/
routes.post('/', validateToken, async (req, res) => {
  // get the user id from the decoded token
  const { payload } = req.decodedToken;
  const { description, level } = req.body;
  const levels = ['Easy', 'Medium', 'Hard'];
  const capLevel = capitalize(level);
  if (description && level) {
    if (levels.includes(capLevel)) {
      try {
        // look up the user in DB and determine whether they exist
        const user = await models.User.findById(payload);
        if (user) {
          // add the act to the users acts
          user.acts.push({ description, level: capLevel });
          await user.save();
          // pull the updated user from the database
          const updatedUser = await models.User.findById(payload);
          // return the update users acts array
          res.status(status.goodRequest).json(updatedUser.acts);
        } else {
          res.status(status.badRequest).json(messages.userNoExist);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(status.badRequest).json(messages.invalidLevel);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnPostAct);
  }
});

/*
[PUT] - to /acts
Send: a valid JWT in the headers and an object containing an act_id and (a description: string and/or level: string (Easy, Medium, or Hard))
Receive: updated array of acts for the user
*/
routes.put('/:actID', validateToken, async (req, res) => {
  const { payload } = req.decodedToken;
  const { actID } = req.params;
  const { description, level } = req.body;
  const levels = ['Easy', 'Medium', 'Hard'];

  if (description || level) {
    if (!level || levels.includes(capitalize(level))) {
      try {
        // check if the user exists and/or the act exists
        const user = await models.User.findById(payload);
        if (user) {
          let act = await user.acts.id(actID);
          if (act) {
            if (level) {
              act.level = capitalize(level);
            }
            if (description) {
              act.description = description;
            }
            await user.save();
            const updatedUser = await models.User.findById(payload);
            res.status(status.goodRequest).json(updatedUser.acts);
          } else {
            res.status(status.badRequest).json(messages.actNoExist);
          }
        } else {
          res.status(status.badRequest).json(messages.userNoExist);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(status.badRequest).json(messages.invalidLevel);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnPutAct);
  }
});

module.exports = routes;