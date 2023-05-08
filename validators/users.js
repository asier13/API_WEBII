const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const createUserValidator = [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
];

const validateCreateUser = handleValidator(createUserValidator);

const updateUserByIdValidator = [
  check('id').isNumeric(),
  check('name').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
];

const validateUpdateUserById = handleValidator(updateUserByIdValidator);

const deleteUserByIdValidator = [
  check('id').isNumeric()
];

const validateDeleteUserById = handleValidator(deleteUserByIdValidator);

module.exports = { validateCreateUser, validateUpdateUserById, validateDeleteUserById };
