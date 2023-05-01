const { check } = require("express-validator");
const handleValidators = require("../utils/handleValidators");

const validatorCreateUser = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
  check("name").notEmpty(),
  check("address").notEmpty(),
  handleValidators,
];

const validatorLogin = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
  handleValidators,
];

module.exports = { validatorCreateUser, validatorLogin };
