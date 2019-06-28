const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../api/server');
const mongoose = require('mongoose');
require('dotenv').config();

const authResources = require('./authResources');
const contactsResources = require('./contactsResources');
const paths = require('../../utils/paths');
const messages = require('../../utils/messages');
const status = require('../../utils/status');
const actsSeed = require('../../data/actsSeed');

chai.use(chaiHttp);
const request = chai.request;
const should = chai.should();
const expect = chai.expect;

describe('/contacts', () => {
  let db;
  before(async () => {
    connection = await mongoose.connect(process.env.TEST_DATBASE_URL, {
      useNewUrlParser: true,
    });
    db = mongoose.model('Contacts', {});
    await db.deleteMany({});
  });

  after(async () => {
    connection = await mongoose.connect(process.env.TEST_DATBASE_URL, {
      useNewUrlParser: true,
    });
    await db.deleteMany({});
  });
  // contacts [GET] endpoint tests
  describe('[GET] /contacts', () => {
    it('returns error when a request is made without a token in the Authorization header', async () => {
      const res = await request(server).get(`${paths.contacts}`);
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.noToken.message);
    });
    it('returns error when a request is made with an invalid token', async () => {
      const res = await request(server)
        .get(`${paths.contacts}`)
        .set(
          authResources.invalidToken.header,
          authResources.invalidToken.entry,
        );
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.invalidToken.message);
    });
    it('returns correct response when a valid get request is made', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(contactsResources.contactsUserGet);
      const res = await request(server)
        .get(`${paths.acts}`)
        .set(authResources.validToken.header, newUser.body.token);
      res.should.have.status(status.goodRequest);
      res.body[0].description.should.equal(actsSeed[0].description);
    });
  });
  // contacts [POST] endpoint tests
  describe('[POST] /contacts', () => {
    it('returns error when a request is made without a token in the Authorization header', async () => {
      const res = await request(server).post(`${paths.contacts}`);
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.noToken.message);
    });
    it('returns error when a request is made with an invalid token', async () => {
      const res = await request(server)
        .post(`${paths.contacts}`)
        .set(
          authResources.invalidToken.header,
          authResources.invalidToken.entry,
        );
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.invalidToken.message);
    });
    it('returns error when a request is made without all required fields', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(contactsResources.contactsUserPost);
      const res = await request(server)
        .post(`${paths.contacts}`)
        .set(authResources.validToken.header, newUser.body.token);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.missingOnPostContact.message);
    });
    it('returns error when a request is made with an invalid level', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(contactsResources.contactsUserPostTwo);
      const res = await request(server)
        .post(`${paths.contacts}`)
        .set(authResources.validToken.header, newUser.body.token)
        .send(contactsResources.invalidContactLevel);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.invalidLevelContact.message);
    });
    it('returns correct response when a valid post request is made', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(contactsResources.contactsUserPostThree);
      const res = await request(server)
        .post(`${paths.contacts}`)
        .set(authResources.validToken.header, newUser.body.token)
        .send(contactsResources.validContact);
      res.should.have.status(status.creationSuccess);
      res.body[res.body.length - 1].first_name.should.equal(
        contactsResources.validContact.firstName,
      );
    });
  });
});
