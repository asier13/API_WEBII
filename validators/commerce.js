const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateMerchant = [
  check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
  check("cif").exists().notEmpty().isLength( {min:9, max: 9} ), 
  check("address").exists().notEmpty(),
  check("password").exists().notEmpty().isLength({ min: 8 }),
  check("email").exists().notEmpty().isEmail(),
  check("telefono").exists().notEmpty(), 
  (req, res, next) => {
      return validateResults(req, res, next);
  }
]
const validatorLoginMerchant = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8 }),
  
    (req, res, next) => {
      validateResults(req, res, next);
    },
  ];
  
  module.exports = {validatorCreateMerchant, validatorLoginMerchant};
