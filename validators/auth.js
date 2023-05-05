const { body } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

exports.loginValidator = handleValidator([
  body('email').isEmail(),
  body('password').notEmpty(),
]);

exports.registerValidator = handleValidator([
  body('Nombre').notEmpty(),
  body('Apellido').notEmpty(),
  body('email').isEmail(),
  body('password').notEmpty(),
]);

exports.updateUserValidator = handleValidator([
  body('Nombre').notEmpty(),
  body('Apellido').notEmpty(),
  body('email').isEmail(),
]);

exports.changePasswordValidator = handleValidator([
  body('oldPassword').notEmpty(),
  body('newPassword').notEmpty(),
]);

exports.resetPasswordValidator = handleValidator([
  body('email').isEmail(),
]);

exports.newPasswordValidator = handleValidator([
  body('password').notEmpty(),
]);
