const usersModelResources = {
  missing_first_name: {
    last_name: 'Jones',
    email: 'jones@gmail.com',
    phone: '+447557689300',
    password: 'password',
  },
  missing_last_name: {
    first_name: 'Jeremy',
    email: 'jones@gmail.com',
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
    email: 'jones@gmail.com',
    password: 'password',
  },
  missing_password: {
    first_name: 'Jeremy',
    last_name: 'Jones',
    email: 'jones@gmail.com',
    phone: '+447557689300',
  },
  valid_user: {
    first_name: 'Jeremy',
    last_name: 'Jones',
    email: 'jones@gmail.com',
    phone: '+447557689300',
    password: 'password',
  },
  missing_first_name_contacts: {
    first_name: 'Jason',
    last_name: 'Jones',
    email: 'jason@gmail.com',
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
    email: 'jasonj@gmail.com',
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
    email: 'jasonj@gmail.com',
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
    email: 'jasonj@gmail.com',
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
    email: 'jasonj@gmail.com',
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
};

module.exports = usersModelResources;
