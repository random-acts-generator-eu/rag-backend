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
};

module.exports = usersModelResources;
