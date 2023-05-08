const express = require('express');
const { validationResult } = require('express-validator');
const { PaginaWeb, paginaWebValidators } = require('../models/paginaWeb');
const { Comercio } = require('../models/comercio');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const paginasWeb = await PaginaWeb.findAll({ include: Comercio });
    res.json(paginasWeb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las páginas web' });
  }
});

router.post('/', paginaWebValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comercio = await Comercio.findByPk(req.body.comercio);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }
    const paginaWeb = await PaginaWeb.create(req.body);
    await comercio.setPaginaWeb(paginaWeb);
    res.json(paginaWeb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la página web' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const paginaWeb = await PaginaWeb.findByPk(req.params.id, { include: Comercio });
    if (!paginaWeb) {
      return res.status(404).json({ message: 'Página web no encontrada' });
    }
    res.json(paginaWeb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la página web' });
  }
});

router.put('/:id', paginaWebValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const paginaWeb = await PaginaWeb.findByPk(req.params.id, { include: Comercio });
    if (!paginaWeb) {
      return res.status(404).json({ message: 'Página web no encontrada' });
    }
    await paginaWeb.update(req.body);
    res.json(paginaWeb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la página web' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const paginaWeb = await PaginaWeb.findByPk(req.params.id);
    if (!paginaWeb) {
      return res.status(404).json({ message: 'Página web no encontrada' });
    }
    await paginaWeb.destroy();
    res.json({ message: 'Página web eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la página web' });
  }
});

module.exports = router;
