const messages = {
  missingOnRegister: {
    message: 'Please include all required fields to register',
  },
  invalidEmail: {
    message: 'Please use a valid email address',
  },
  invalidPassword: {
    message: 'Please use a password with at least 7 charcters',
  },
  missingOnLogin: {
    message: 'Please include all required fields to login',
  },
  invalidCredentials: {
    message: 'Please use valid login credentials',
  },
  noToken: {
    message: 'Please provide a token in the Authorization header',
  },
  invalidToken: {
    message: 'Please provide valid token',
  },
  userNoExist: {
    message: 'User with this token does not exist',
  },
  missingOnPostAct: {
    message: 'Please include a description and level to add a new act',
  },
  invalidLevelAct: {
    message: 'Please include a valid level for the act: easy, medium, or hard',
  },
  missingOnPutAct: {
    message: 'Please include a description or level to update an act',
  },
  actNoExist: {
    message: 'Act with this ID does not exist',
  },
  noActID: {
    message: 'Pleasse provide an actID in the params',
  },
  missingOnPostContact: {
    message: 'Please include a firstName, lastName, and level to add a new act',
  },
  invalidLevelContact: {
    message:
      'Please include a valid level for the contact: friend, close friend, or best friend',
  },
  contactNoExist: {
    message: 'Contact with this ID does not exist',
  },
  missingOnPutContact: {
    message:
      'Please include a firstName, lastName or level to update a contact',
  },
  userAlreadyExists: {
    message:
      'A user with this email address already exists, please use another',
  },
};

module.exports = messages;
