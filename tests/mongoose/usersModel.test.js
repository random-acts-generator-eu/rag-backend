const User = require('../../model/userModel');
const chai = require('chai');

const usersModelResources = require('./usersModelResources');
const dbValidation = require('../../utils/dbValidation');

const should = chai.should();
const expect = chai.expect;

describe('User Model', () => {
  it('returns an error if no first_name is given with a new user', async () => {
    const newUser = await new User(usersModelResources.missing_first_name);
    newUser.validate(res => {
      res.errors.first_name.message.should.equal(
        dbValidation.first_name_missing,
      );
    });
  });
  it('returns an error if no last_name is given with a new user', async () => {
    const newUser = await new User(usersModelResources.missing_last_name);
    newUser.validate(res => {
      res.errors.last_name.message.should.equal(dbValidation.last_name_missing);
    });
  });
  it('returns an error if no email is given with a new user', async () => {
    const newUser = await new User(usersModelResources.missing_email);
    newUser.validate(res => {
      res.errors.email.message.should.equal(dbValidation.email_missing);
    });
  });
  it('returns an error if no phone is given with a new user', async () => {
    const newUser = await new User(usersModelResources.missing_phone);
    newUser.validate(res => {
      res.errors.phone.message.should.equal(dbValidation.phone_missing);
    });
  });
  it('returns an error if no password is given with a new user', async () => {
    const newUser = await new User(usersModelResources.missing_password);
    newUser.validate(res => {
      res.errors.password.message.should.equal(dbValidation.password_missing);
    });
  });
  it('returns correct response when a valid user is added', async () => {
    const newUser = await new User(usersModelResources.valid_user);
    expect(newUser).to.have.property('_id');
  });
});
