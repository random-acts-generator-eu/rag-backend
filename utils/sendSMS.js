require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);

const sendSMS = async (phone, message) => {
  const res = await client.messages.create({
    body: message,
    from: process.env.TWILIO_NUM,
    to: phone,
  });
  return res;
};

module.exports = sendSMS;
