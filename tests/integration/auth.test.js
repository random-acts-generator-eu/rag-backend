const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../api/server');
const mongoose = require('mongoose');
require('dotenv').config();

const authResources = require('./authResources');
const paths = require('../../utils/paths');
const messages = require('../../utils/messages');
const status = require('../../utils/status');

chai.use(chaiHttp);

describe('/api/auth', () => {
  let db;

  before(async () => {
    connection = await mongoose.connect(process.env.TEST_DATBASE_URL, {
      useNewUrlParser: true,
    });
    db = mongoose.model('Users', {});
    await db.deleteMany({});
  });

  after(async () => {
    connection = await mongoose.connect(process.env.TEST_DATBASE_URL, {
      useNewUrlParser: true,
    });
    await db.deleteMany({});
  });

  describe('[POST] /register', () => {
    it('returns error when a request is made without all required fields', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send({});
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.missingOnRegister.message);
    });
    it('returns error when a request is made with an invalid email', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.invalidEmailUser);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.invalidEmail.message);
    });
    it('returns error when a user with the email already exists', async () => {
      await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.newUser);

      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.duplicateEmailUser);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.userAlreadyExists.message);
    });
    it('returns error when a request is made with a password less than 7 characters', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.invalidPasswordUser);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.invalidPassword.message);
    });
    it('returns response when a valid registration request is made', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.sucessfulUser);
      res.should.have.status(status.creationSuccess);
      res.body.user.first_name.should.equal(
        authResources.sucessfulUser.firstName,
      );
    });
    it('does not return plain password string when a valid registration request is made', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.sucessfulPasswordUser);
      res.body.user.password.should.not.equal(
        authResources.sucessfulPasswordUser.password,
      );
    });
  });
});
