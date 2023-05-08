const Comercio = require('../models/comercio');

const darDeAltaComercio = async (req, res) => {
  try {
    const comercio = new Comercio(req.body);
    await comercio.save();
    res.status(201).json({ message: 'Comercio creado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al crear el comercio' });
  }
};

const modificarComercio = async (req, res) => {
  try {
    const comercio = await Comercio.findByIdAndUpdate(req.params.id, req.body);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }
    res.json({ message: 'Comercio modificado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al modificar el comercio' });
  }
};

const consultarComercios = async (req, res) => {
  try {
    const comercios = await Comercio.find();
    res.json(comercios);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al consultar los comercios' });
  }
};

const eliminarComercio = async (req, res) => {
  try {
    const comercio = await Comercio.findByIdAndDelete(req.params.id);
    if (!comercio) {
      return res.status(404).json({ message: 'Comercio no encontrado' });
    }
    res.json({ message: 'Comercio eliminado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al eliminar el comercio' });
  }
};

module.exports = {
  darDeAltaComercio,
  modificarComercio,
  consultarComercios,
  eliminarComercio
};
