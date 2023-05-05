const handleValidator = require('../utils/handleValidator');
const { body } = require('express-validator');

const commerceValidator = [
  handleValidator(
    body('name')
      .not().isEmpty().withMessage('Name is required.')
      .isLength({ max: 50 }).withMessage('El nombre puede tener maximo 50 caracteres.'),
    body('description')
      .isLength({ max: 500 }).withMessage('La descripcion debe tener maximo 500 caracteres'),
    body('price')
      .isNumeric().withMessage('El precio debe ser un numero'),
    body('quantity')
      .isNumeric().withMessage('La cantidad debe ser un numero')
  )
];

module.exports = commerceValidator;
