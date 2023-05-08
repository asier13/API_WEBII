const PaginaWeb = require('../models/paginaWeb');
const Usuario = require('../models/usuario');

const darDeAltaPaginaWeb = async (req, res) => {
  try {
    const paginaWeb = new PaginaWeb(req.body);
    await paginaWeb.save();
    res.status(201).json({ message: 'Página web creada correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al crear la página web' });
  }
};

const modificarPaginaWeb = async (req, res) => {
  try {
    const paginaWeb = await PaginaWeb.findByIdAndUpdate(req.params.id, req.body);
    if (!paginaWeb) {
      return res.status(404).json({ message: 'Página web no encontrada' });
    }
    res.json({ message: 'Página web modificada correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al modificar la página web' });
  }
};

const subirFotosOTexto = async (req, res) => {
  try {
    const paginaWeb = await PaginaWeb.findById(req.params.id);
    if (!paginaWeb) {
      return res.status(404).json({ message: 'Página web no encontrada' });
    }
    paginaWeb.fotosOTexto.push(req.body);
    await paginaWeb.save();
    res.json({ message: 'Fotos o texto subidos correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al subir las fotos o texto' });
  }
};

const borrarPaginaWeb = async (req, res) => {
  try {
    const paginaWeb = await PaginaWeb.findByIdAndDelete(req.params.id);
    if (!paginaWeb) {
      return res.status(404).json({ message: 'Página web no encontrada' });
    }
    res.json({ message: 'Página web eliminada correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al eliminar la página web' });
  }
};

const verUsuariosCiudad = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ ciudad: req.params.ciudad });
    res.json(usuarios);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al consultar los usuarios' });
  }
};

module.exports = {
  darDeAltaPaginaWeb,
  modificarPaginaWeb,
  subirFotosOTexto,
  borrarPaginaWeb,
  verUsuariosCiudad
};
