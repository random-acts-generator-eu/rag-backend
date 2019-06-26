const express = require('express');

const paths = require('../utils/paths');
const { models } = require('../model/index');
const status = require('../utils/status');
const messages = require('../utils/messages');
const validateToken = require('../middleware/validateToken');
const sendSMS = require('../utils/sendSMS');

const routes = express.Router();

/*
[POST] - to /sms
Send: body with a message
Receive: success message
*/
routes.post('/', validateToken, async (req, res) => {
  const { payload } = req.decodedToken;
  const { message } = req.body;
  if (message.length) {
    try {
      // get the users phone number so it can be excluded from the array
      const user = await models.User.findById(payload);
      if (user) {
        const senderPhone = user.phone;
        // grab a random phone number from the other users on  the app
        const users = await models.User.find({});
        const phones = users
          .map(user => user.phone)
          .filter(phone => phone !== senderPhone);
        const receiverPhone =
          phones[Math.floor(Math.random() * (phones.length - 1 - 0) + 0)];
        // send the message via Twilio
        const sendRes = await sendSMS(receiverPhone, message);
        if (sendRes.sid) {
          res.status(status.goodRequest).json(message);
        }
      } else {
        res.status(status.badRequest).json(messages.userNoExist);
      }
    } catch (error) {
      res.status(status.serverError).json(error);
    }
  } else {
    res.status(status.badRequest).json(messages.noMessage);
  }
});

module.exports = routes;
