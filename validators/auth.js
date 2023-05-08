const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const registerValidator = [
  check('nombre').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
];

const validateRegister = handleValidator(registerValidator);

const loginValidator = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
];

const validateLogin = handleValidator(loginValidator);

const setAdminValidator = [
  check('email').isEmail()
];

const validateSetAdmin = handleValidator(setAdminValidator);

const updateUserValidator = [
  check('id').isNumeric(),
  check('nombre').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
];

const validateUpdateUser = handleValidator(updateUserValidator);

const deleteUserValidator = [
  check('id').isNumeric()
];

const validateDeleteUser = handleValidator(deleteUserValidator);

module.exports = { validateRegister, validateLogin, validateSetAdmin, validateUpdateUser, validateDeleteUser };
