const validatePassword = password => {
  if (password.length > 6) {
    return true;
  } else {
    return false;
  }
};

module.exports = validatePassword;
