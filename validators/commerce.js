const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const registerMerchantValidator = [
  check('nombre').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('direccion').notEmpty(),
  check('ciudad').notEmpty()
];

const validateRegisterMerchant = handleValidator(registerMerchantValidator);

const updateMerchantByIdValidator = [
  check('id').isNumeric(),
  check('nombre').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('direccion').notEmpty(),
  check('ciudad').notEmpty()
];

const validateUpdateMerchantById = handleValidator(updateMerchantByIdValidator);

const deleteMerchantByIdValidator = [
  check('id').isNumeric()
];

const validateDeleteMerchantById = handleValidator(deleteMerchantByIdValidator);

module.exports = { validateRegisterMerchant, validateUpdateMerchantById, validateDeleteMerchantById };
