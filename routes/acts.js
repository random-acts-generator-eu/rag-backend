const express = require('express');

const { models } = require('../model/index');
const status = require('../utils/status');
const messages = require('../utils/messages');
const validateToken = require('../middleware/validateToken');
const capitalize = require('../utils/capitalize');
const levels = require('../utils/levels');

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
    res.status(status.serverError).json({ mesage: error });
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
  if (description && level) {
    const capLevel = capitalize(level);
    if (levels.acts.includes(capLevel)) {
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
          res.status(status.creationSuccess).json(updatedUser.acts);
        } else {
          res.status(status.badRequest).json(messages.userNoExist);
        }
      } catch (error) {
        res.status(status.serverError).json({ mesage: error });
      }
    } else {
      res.status(status.badRequest).json(messages.invalidLevelAct);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnPostAct);
  }
});

/*
[PUT] - to /acts
Send: a valid JWT in the headers, an actID in params, and a body with description: string and/or level: string (Easy, Medium, or Hard)
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
          // check if the act within the user exists
          let act = await user.acts.id(actID);
          if (act) {
            // change the level for the act if its included in the request
            if (level) {
              act.level = capitalize(level);
            }
            // change the description for the act if its included in request
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
        res.status(status.serverError).json({ mesage: error });
      }
    } else {
      res.status(status.badRequest).json(messages.invalidLevelAct);
    }
  } else {
    res.status(status.badRequest).json(messages.missingOnPutAct);
  }
});

/*
[DELETE] - to /acts
Send: a valid JWT in the headers and an actID in params
Receive: updated array of acts for the user
*/
routes.delete('/:actID', validateToken, async (req, res) => {
  const { payload } = req.decodedToken;
  const { actID } = req.params;

  try {
    // check if the user exists
    const user = await models.User.findById(payload);
    if (user) {
      // check if the act within the user exists
      let act = await user.acts.id(actID);
      if (act) {
        // delete the act
        await act.remove();
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
    res.status(status.serverError).json({ mesage: error });
  }
});

module.exports = routes;
