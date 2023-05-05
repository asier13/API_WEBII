const handleValidator = require('../utils/handleValidator');
const { body } = require('express-validator');

const storageValidator = [
  handleValidator(
    body('name')
      .not().isEmpty().withMessage('Name is required.')
      .isLength({ max: 50 }).withMessage('Name can contain at most 50 characters.'),
    body('description')
      .isLength({ max: 500 }).withMessage('Description can contain at most 500 characters.'),
    body('price')
      .isNumeric().withMessage('Price should be a numeric value.'),
    body('category')
      .isLength({ max: 50 }).withMessage('Category can contain at most 50 characters.'),
    body('image')
      .isURL().withMessage('Image should be a valid URL.')
  )
];

module.exports = storageValidator;
