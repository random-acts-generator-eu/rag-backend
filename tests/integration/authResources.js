const authResources = {
  invalidEmailUser: {
    firstName: 'Ben',
    lastName: 'Humes',
    email: 'beep',
    phone: '+44755673872',
    password: 'password',
  },
  newUser: {
    firstName: 'Ben',
    lastName: 'Humes',
    email: 'ben@gmail.com',
    phone: '+44755673872',
    password: 'password',
  },
  duplicateEmailUser: {
    firstName: 'Ben',
    lastName: 'Thompson',
    email: 'ben@gmail.com',
    phone: '+44753246872',
    password: 'password',
  },
  invalidPasswordUser: {
    firstName: 'Hamish',
    lastName: 'Humes',
    email: 'hamish@gmail.com',
    phone: '+44235673872',
    password: '123',
  },
  sucessfulUser: {
    firstName: 'Dan',
    lastName: 'Howard',
    email: 'dan@gmail.com',
    phone: '+44343473872',
    password: 'password',
  },
  sucessfulUserPassword: {
    firstName: 'Jenny',
    lastName: 'Hasty',
    email: 'jenny@gmail.com',
    phone: '+44343473833',
    password: 'password',
  },
};

module.exports = authResources;
