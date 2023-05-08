const mongoose = require('mongoose');
const { body } = require('express-validator');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  ciudad: {
    type: String,
    required: true
  },
  intereses: {
    type: [String],
    default: []
  },
  permitirRecibirOfertas: {
    type: Boolean,
    default: false
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

const usuarioValidators = [
  body('email').isEmail(),
  body('ciudad').isString().notEmpty(),
  body('intereses').isArray()
];

module.exports = { Usuario, usuarioValidators };
