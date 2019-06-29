require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../api/server');
const mongoose = require('mongoose');

const authResources = require('./authResources');
const paths = require('../../utils/paths');
const messages = require('../../utils/messages');
const status = require('../../utils/status');

chai.use(chaiHttp);
const request = chai.request;
const should = chai.should();

describe('/auth', () => {
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
  // register endpoint tests
  describe('[POST] /register', () => {
    it('returns error when a request is made without all required fields', async () => {
      const res = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send({});
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.missingOnRegister.message);
    });
    it('returns error when a request is made with an invalid email', async () => {
      const res = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.invalidEmailUser);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.invalidEmail.message);
    });
    it('returns error when a user with the email already exists', async () => {
      await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.newUser);
      const res = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.duplicateEmailUser);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.userAlreadyExists.message);
    });
    it('returns error when a request is made with a password less than 7 characters', async () => {
      const res = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.invalidPasswordUser);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.invalidPassword.message);
    });
    it('returns correct response when a valid registration request is made', async () => {
      const res = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.sucessfulUser);
      res.should.have.status(status.creationSuccess);
      res.body.user.first_name.should.equal(
        authResources.sucessfulUser.firstName,
      );
    });
    it('does not return plain password string when a valid registration request is made', async () => {
      const res = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.sucessfulPasswordUser);
      res.body.user.password.should.not.equal(
        authResources.sucessfulPasswordUser.password,
      );
    });
  });
  // login endpoint tests
  describe('[POST] /login', () => {
    it('returns error when a request is made without all required fields', async () => {
      const res = await request(server)
        .post(`${paths.auth}${paths.login}`)
        .send({
          email: authResources.newUser.email,
        });
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.missingOnLogin.message);
    });
    it('returns error when a request is made with invalid login credentials', async () => {
      const res = await request(server)
        .post(`${paths.auth}${paths.login}`)
        .send({
          email: authResources.newUser.email,
          password: authResources.invalidPasswordUser.password,
        });
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.invalidCredentials.message);
    });
    it('returns correct response when a valid login request is made', async () => {
      await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authResources.sucessfulUser);
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.login}`)
        .send({
          email: authResources.sucessfulUser.email,
          password: authResources.sucessfulUser.password,
        });
      res.should.have.status(status.goodRequest);
      res.body.user.first_name.should.equal(
        authResources.sucessfulUser.firstName,
      );
    });
  });
});
