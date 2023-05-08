const mongoose = require('mongoose');
const { body } = require('express-validator');

const comercioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  actividad: {
    type: String,
    required: true
  },
  scoring: {
    type: Number,
    default: 0
  },
  votos: {
    type: Number,
    default: 0
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
});

const Comercio = mongoose.model('Comercio', comercioSchema);

const comercioValidators = [
  body('nombre').isString().notEmpty(),
  body('direccion').isString().notEmpty(),
  body('ciudad').isString().notEmpty(),
  body('actividad').isString().notEmpty()
];

module.exports = { Comercio, comercioValidators };
