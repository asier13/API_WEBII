const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const registerPaginaCompletaValidator = [
  check('ciudad').notEmpty(),
  check('actividad').notEmpty(),
  check('titulo').notEmpty(),
  check('resumen').notEmpty()
];

const validateRegisterPaginaCompleta = handleValidator(registerPaginaCompletaValidator);

module.exports = { validateRegisterPaginaCompleta };
