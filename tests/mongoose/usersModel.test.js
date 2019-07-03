const User = require('../../model/userModel');
const chai = require('chai');

const usersModelResources = require('./usersModelResources');
const dbValidation = require('../../utils/dbValidation');

const should = chai.should();
const expect = chai.expect;

describe('DB', () => {
  describe('User schema', () => {
    it('returns error if no first_name is given with a new user', async () => {
      const newUser = await new User(usersModelResources.missing_first_name);
      newUser.validate(res => {
        res.errors.first_name.message.should.equal(
          dbValidation.first_name_missing,
        );
      });
    });
    it('returns error if no last_name is given with a new user', async () => {
      const newUser = await new User(usersModelResources.missing_last_name);
      newUser.validate(res => {
        res.errors.last_name.message.should.equal(
          dbValidation.last_name_missing,
        );
      });
    });
    it('returns error if no email is given with a new user', async () => {
      const newUser = await new User(usersModelResources.missing_email);
      newUser.validate(res => {
        res.errors.email.message.should.equal(dbValidation.email_missing);
      });
    });
    it('returns error if no phone is given with a new user', async () => {
      const newUser = await new User(usersModelResources.missing_phone);
      newUser.validate(res => {
        res.errors.phone.message.should.equal(dbValidation.phone_missing);
      });
    });
    it('returns error if no password is given with a new user', async () => {
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
  describe('Contacts schema', () => {
    it('returns error if no first_name is given with a new contact', async () => {
      const newUser = await new User(
        usersModelResources.missing_first_name_contacts,
      );
      newUser.validate(res => {
        res.errors[`contacts.0.first_name`].message.should.equal(
          dbValidation.first_name_missing,
        );
      });
    });
    it('returns error if no last_name is given with a new contact', async () => {
      const newUser = await new User(
        usersModelResources.missing_last_name_contacts,
      );
      newUser.validate(res => {
        res.errors[`contacts.0.last_name`].message.should.equal(
          dbValidation.last_name_missing,
        );
      });
    });
    it('returns error if no level is given with a new contact', async () => {
      const newUser = await new User(
        usersModelResources.missing_level_contacts,
      );
      newUser.validate(res => {
        res.errors[`contacts.0.level`].message.should.equal(
          dbValidation.level_missing,
        );
      });
    });
    it('returns error if invalid level is given with a new contact', async () => {
      const newUser = await new User(
        usersModelResources.invalid_level_contacts,
      );
      newUser.validate(res => {
        res.errors[`contacts.0.level`].message.should.equal(
          dbValidation.invalid_level,
        );
      });
    });
    it('returns correct response when a valid contact is added', async () => {
      const newUser = await new User(usersModelResources.valid_contacts);
      expect(newUser).to.have.property('_id');
    });
  });
});

// contacts
// 2) valid request

// describe('Acts schema', () => {
// 1) description missing
// 2) level missing
// 3) invalid level
// 4) valid request
// })
