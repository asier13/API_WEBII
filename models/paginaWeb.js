const mongoose = require('mongoose');
const { body } = require('express-validator');

const paginaWebSchema = new mongoose.Schema({
  fotos: {
    type: [String],
    default: []
  },
  texto: {
    type: String,
    default: ''
  },
  comercio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comercio',
    required: true
  }
});

const PaginaWeb = mongoose.model('PaginaWeb', paginaWebSchema);

const paginaWebValidators = [
  body('fotos').isArray(),
  body('texto').isString()
];

module.exports = { PaginaWeb, paginaWebValidators };
