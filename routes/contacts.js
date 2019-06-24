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

module.exports = routes;
