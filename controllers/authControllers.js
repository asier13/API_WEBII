const jwt = require('jsonwebtoken');
const { matchedData, validationResult } = require('express-validator');
const handleJWT = require('../utils/handleJWT');
const handlePassword = require('../utils/handlePassword');
const User = require('../models/mysql/users');

const login = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const { email, password } = matchedData(req);
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'El usuario no está activo' });
    }

    const isMatch = await handlePassword.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = handleJWT.sign(user);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    validationResult(req).throw();

    const { name, email, password } = matchedData(req);
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await handlePassword.hash(password);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = handleJWT.sign(user);

    res.status(201).json({ message: 'Usuario creado', token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    validationResult(req).throw();
    
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  logout,
};
