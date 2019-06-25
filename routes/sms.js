require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);

client.messages.create({
  body: 'test',
  from: '+441903684030',
  to: '+447557955350',
});
