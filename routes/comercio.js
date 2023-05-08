const express = require('express');
const { validationResult } = require('express-validator');
const { Comercio, comercioValidators } = require('../models/comercio');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comercios = await Comercio.findAll();
    res.json(comercios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los comercios' });
  }
});

router.post('/', comercioValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comercio = await Comercio.create(req.body);
    res.json(comercio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el comercio' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comercio = await Comercio.findByPk(req.params.id);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }
    res.json(comercio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el comercio' });
  }
});

router.put('/:id', comercioValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comercio = await Comercio.findByPk(req.params.id);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }
    await comercio.update(req.body);
    res.json(comercio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el comercio' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const comercio = await Comercio.findByPk(req.params.id);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }
    await comercio.destroy();
    res.json({ message: 'Comercio eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el comercio' });
  }
});

module.exports = router;
