const usersModelResources = {
  missing_first_name: {
    last_name: 'Jones',
    email: 'jones@gmail.com',
    phone: '+447557689300',
    password: 'password',
  },
  missing_last_name: {
    first_name: 'Jeremy',
    email: 'jonesj@gmail.com',
    phone: '+447557689300',
    password: 'password',
  },
  missing_email: {
    first_name: 'Jeremy',
    last_name: 'Jones',
    phone: '+447557689300',
    password: 'password',
  },
  missing_phone: {
    first_name: 'Jeremy',
    last_name: 'Jones',
    email: 'jonesje@gmail.com',
    password: 'password',
  },
  missing_password: {
    first_name: 'Jeremy',
    last_name: 'Jones',
    email: 'jonesjer@gmail.com',
    phone: '+447557689300',
  },
  valid_user: {
    first_name: 'Jeremy',
    last_name: 'Jones',
    email: 'jonesjere@gmail.com',
    phone: '+447557689300',
    password: 'password',
  },
  missing_first_name_contacts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jasonjerem@gmail.com',
    phone: '+447557689301',
    password: 'password',
    contacts: [
      {
        last_name: 'Pollard',
        level: 'Friend',
      },
    ],
  },
  missing_last_name_contacts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jasonjeremy@gmail.com',
    phone: '+447557689301',
    password: 'password',
    contacts: [
      {
        first_name: 'Sue',
        level: 'Friend',
      },
    ],
  },
  missing_level_contacts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jj@gmail.com',
    phone: '+447557689301',
    password: 'password',
    contacts: [
      {
        first_name: 'Sue',
        last_name: 'Pollard',
      },
    ],
  },
  invalid_level_contacts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jja@gmail.com',
    phone: '+447557689301',
    password: 'password',
    contacts: [
      {
        first_name: 'Sue',
        last_name: 'Pollard',
        level: 'Beep',
      },
    ],
  },
  valid_contacts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jjas@gmail.com',
    phone: '+447557689301',
    password: 'password',
    contacts: [
      {
        first_name: 'Sue',
        last_name: 'Pollard',
        level: 'Friend',
      },
    ],
  },
  missing_description_acts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jjaso@gmail.com',
    phone: '+447557689301',
    password: 'password',
    acts: [
      {
        level: 'Easy',
      },
    ],
  },
  missing_level_acts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jjason@gmail.com',
    phone: '+447557689301',
    password: 'password',
    acts: [
      {
        description: 'Cook them some food',
      },
    ],
  },
  invalid_level_acts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jaj@gmail.com',
    phone: '+447557689301',
    password: 'password',
    acts: [
      {
        description: 'Cook them some food',
        level: 'Beep',
      },
    ],
  },
  valid_acts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jajo@gmail.com',
    phone: '+447557689301',
    password: 'password',
    acts: [
      {
        description: 'Cook them some food',
        level: 'Easy',
      },
    ],
  },
};

module.exports = usersModelResources;
