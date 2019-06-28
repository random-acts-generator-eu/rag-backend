const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../api/server');
const mongoose = require('mongoose');
require('dotenv').config();

const authResources = require('./authResources');
const actsResources = require('./actsResources');
const paths = require('../../utils/paths');
const messages = require('../../utils/messages');
const status = require('../../utils/status');
const actsSeed = require('../../data/actsSeed');

chai.use(chaiHttp);
const request = chai.request;
const should = chai.should();

describe('/api/auth', () => {
  let db;
  before(async () => {
    connection = await mongoose.connect(process.env.TEST_DATBASE_URL, {
      useNewUrlParser: true,
    });
    db = mongoose.model('Acts', {});
    await db.deleteMany({});
  });

  after(async () => {
    connection = await mongoose.connect(process.env.TEST_DATBASE_URL, {
      useNewUrlParser: true,
    });
    await db.deleteMany({});
  });
  // acts [GET] endpoint tests
  describe('[GET] /acts', () => {
    it('returns error when a request is made without a token in the Authorization header', async () => {
      const res = await request(server).get(`${paths.acts}`);
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.noToken.message);
    });
    it('returns error when a request is made with an invalid token', async () => {
      const res = await request(server)
        .get(`${paths.acts}`)
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
        .send(actsResources.actsUserGet);
      const res = await request(server)
        .get(`${paths.acts}`)
        .set(authResources.validToken.header, newUser.body.token);
      res.should.have.status(status.goodRequest);
      res.body[0].description.should.equal(actsSeed[0].description);
    });
  });
  // acts [POST] endpoint tests
  describe('[POST] /acts', () => {
    it('returns error when a request is made without a token in the Authorization header', async () => {
      const res = await request(server).post(`${paths.acts}`);
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.noToken.message);
    });
    it('returns error when a request is made with an invalid token', async () => {
      const res = await request(server)
        .post(`${paths.acts}`)
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
        .send(actsResources.actsUserPost);
      const res = await request(server)
        .post(`${paths.acts}`)
        .set(authResources.validToken.header, newUser.body.token);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.missingOnPostAct.message);
    });
    it('returns error when a request is made with an invalid level', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(actsResources.actsUserPostTwo);
      const res = await request(server)
        .post(`${paths.acts}`)
        .set(authResources.validToken.header, newUser.body.token)
        .send(actsResources.invalidActLevel);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.invalidLevelAct.message);
    });
    it('returns correct response when a valid get request is made', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(actsResources.actsUserPostThree);
      const res = await request(server)
        .post(`${paths.acts}`)
        .set(authResources.validToken.header, newUser.body.token)
        .send(actsResources.validAct);
      res.should.have.status(status.creationSuccess);
      res.body[res.body.length - 1].description.should.equal(
        actsResources.validAct.description,
      );
    });
  });
  // acts [PUT] endpoint tests
  describe('[PUT] /acts', () => {
    it('returns error when a request is made without a token in the Authorization header', async () => {
      const res = await request(server).put(
        `${paths.acts}/${actsResources.invalidAct.id}`,
      );
      res.should.have.status(status.badCredentials);
      res.body.message.should.equal(messages.noToken.message);
    });
    it('returns error when a request is made with an invalid token', async () => {
      const res = await request(server)
        .put(`${paths.acts}/${actsResources.invalidAct.id}`)
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
        .send(actsResources.actsUserPutOne);
      const res = await request(server)
        .put(`${paths.acts}/${actsResources.invalidAct.id}`)
        .set(authResources.validToken.header, newUser.body.token);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.missingOnPutAct.message);
    });
    it('returns error when a request is made with an invalid level', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(actsResources.actsUserPutTwo);
      const res = await request(server)
        .put(`${paths.acts}/${actsResources.invalidAct.id}`)
        .set(authResources.validToken.header, newUser.body.token)
        .send(actsResources.invalidAct);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.invalidLevelAct.message);
    });
    it('returns error when a request is made with an invalid actID', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(actsResources.actsUserPutThree);
      const res = await request(server)
        .put(`${paths.acts}/${actsResources.invalidAct.id}`)
        .set(authResources.validToken.header, newUser.body.token)
        .send(actsResources.validAct);
      res.should.have.status(status.badRequest);
      res.body.message.should.equal(messages.actNoExist.message);
    });
    it('returns correct response when a valid get request is made', async () => {
      const newUser = await request(server)
        .post(`${paths.auth}${paths.register}`)
        .send(actsResources.actsUserPutFour);
      const res = await request(server)
        .put(`${paths.acts}/${newUser.body.user.acts[0]._id}`)
        .set(authResources.validToken.header, newUser.body.token)
        .send(actsResources.validAct);
      res.should.have.status(status.goodRequest);
      res.body[0].description.should.equal(
      actsResources.validAct.description,
      );
    });
  });
});
