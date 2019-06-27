const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../api/server');
const mongoose = require('mongoose');
require('dotenv').config();

const authTestResources = require('./authTestResources');
const paths = require('../../utils/paths');
const messages = require('../../utils/messages');
const status = require('../../utils/status');

chai.use(chaiHttp);

describe('/api/auth', () => {
  let connection;
  let db;

  before(async () => {
    connection = await mongoose.connect(process.env.TEST_DATBASE_URL, {
      useNewUrlParser: true,
    });
    db = mongoose.model('Users', {});
    await db.deleteMany({});
  });

  describe('[POST] /register', () => {
    it('returns error when a request is made without all required fields', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send({});
      res.should.have.status(status.badRequest);
      res.text.should.equal(JSON.stringify(messages.missingOnRegister));
    });
  });

  describe('[POST] /register', () => {
    it('returns error when a request is made with an invalid email', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authTestResources.invalidEmailUser);
      res.should.have.status(status.badRequest);
      res.text.should.equal(JSON.stringify(messages.invalidEmail));
    });
  });

  describe('[POST] /register', () => {
    it('returns error when a user with the email already exists', async () => {
      await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authTestResources.newUser);

      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authTestResources.duplicateEmailUser);
      res.should.have.status(status.badRequest);
      res.text.should.equal(JSON.stringify(messages.userAlreadyExists));
    });
  });

  describe('[POST] /register', () => {
    it('returns error when a request is made with a password less than 7 characters', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authTestResources.invalidPasswordUser);
      res.should.have.status(status.badRequest);
      res.text.should.equal(JSON.stringify(messages.invalidPassword));
    });
  });

  describe('[POST] /register', () => {
    it('returns response when a valid registration request is made', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authTestResources.sucessfulUser);
      res.should.have.status(status.creationSuccess);
      res.body.user.first_name.should.equal(
        authTestResources.sucessfulUser.firstName,
      );
    });
  });

  describe('[POST] /register', () => {
    it('does not return plain password string when a valid registration request is made', async () => {
      const res = await chai
        .request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(authTestResources.sucessfulUserPassword);
      res.body.user.password.should.not.equal(
        authTestResources.sucessfulUserPassword.password,
      );
    });
  });
});
