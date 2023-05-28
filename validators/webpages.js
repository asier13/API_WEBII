const { check, param } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorUploadContent = [
  param("id").notEmpty(),
  check("city").exists().notEmpty().isLength({min:3, max:30}),
  check("activity").exists().notEmpty(),
  check("title").exists().notEmpty().isLength({min:5, max:100}),
  check("summary").exists().notEmpty().isLength({min:5, max:255}),

  (req, res, next) => {
    validateResults(req, res, next);
  },
];

const validatorUpdateScoring = [
  check("nonEditable.scoring")
    .isArray({ min: 1 })
    .custom((value) => value.every((val) => typeof val === "number")),
  check("nonEditable.reviews")
    .isArray({ min: 1 })
    .custom((value) => value.every((val) => typeof val === "string")),

  (req, res, next) => {
    validateResults(req, res, next);
  },
];

module.exports = {validatorUploadContent,validatorUpdateScoring};
