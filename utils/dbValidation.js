const dbValidation = {
  first_name_missing: 'Path `first_name` is required.',
  last_name_missing: 'Path `last_name` is required.',
  email_missing: 'Path `email` is required.',
  phone_missing: 'Path `phone` is required.',
  password_missing: 'Path `password` is required.',
  level_missing: 'Path `level` is required.',
  invalid_level: '`Beep` is not a valid enum value for path `level`.',
};

module.exports = dbValidation;
