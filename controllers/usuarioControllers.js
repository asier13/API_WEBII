const Usuario = require('../models/usuario');

const modificarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario modificado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al modificar el usuario' });
  }
};

const darseDeBaja = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

const votarPaginaWeb = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const paginaWeb = await PaginaWeb.findById(req.params.idPaginaWeb);
    if (!paginaWeb) {
      return res.status(404).json({ message: 'Página web no encontrada' });
    }
    paginaWeb.score += req.body.score;
    await paginaWeb.save();
    usuario.votos.push({
      paginaWeb: req.params.idPaginaWeb,
      score: req.body.score,
      reseña: req.body.reseña
    });
    await usuario.save();
    res.json({ message: 'Voto registrado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al votar la página web' });
  }
};

module.exports = {
  modificarUsuario,
  darseDeBaja,
  votarPaginaWeb
};
