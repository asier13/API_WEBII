const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

var validatorCreateItem = [];

  validatorCreateItem = [
    check("name").exists().notEmpty().isLength({ min: 5, max: 90 }),
    check("address").exists().notEmpty(),
    check("latitude").exists().notEmpty().isNumeric(),
    check("longitude").exists().notEmpty().isNumeric(),
    check("phoneNumber").exists().notEmpty().isMobilePhone("es-ES"),
    check("email").exists().notEmpty().isEmail(),
    check("owner_name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("owner_age").exists().notEmpty().isNumeric(),
    check("owner_email").exists().notEmpty().isEmail(),
    check("owner_password").exists().notEmpty().isLength({ min: 8, max: 64 }),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];

const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateItem, validatorGetItem };
