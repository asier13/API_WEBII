const { usersModel } = require('../models');
const { validationResult } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { encrypt, compare } = require("../utils/handlePassword");

/**
 * Obtener lista de usuarios
 * @param {*} req
 * @param {*} res
*/

const getUsers = async (req, res) => {
    try{
        const data = await usersModel.findAll({});
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_GET_USERS', 403);
    }
}
/**
 * Crear un usuario
 * @param {*} req
 * @param {*} res
 * @param {boolean} isAdmin - Indica si el usuario es un admin o no
*/

const createUser = async (req, res, isAdmin = false) => {
  try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;
      const encryptedPassword = await encrypt(password);
      const role = isAdmin ? "admin" : "user";
      const data = await usersModel.create({ name, email, password: encryptedPassword, role });
      res.send(data);
  }catch(err){
      handleHttpError(res, 'ERROR_CREATE_USER');
  }
}

/**
 * Obtener un usuario por id
 * @param {*} req
 * @param {*} res
*/

const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await usersModel.findOne({ where: { id } });
        res.send(data);
    }catch(err){
        handleHttpError(res, "ERROR_GET_USER_BY_ID");
    }
}

/**
 * Actualizar un usuario por id
 * @param {*} req
 * @param {*} res
*/

const updateUserById = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        const encryptedPassword = await encrypt(password);
        const data = await usersModel.update({ name, email, password: encryptedPassword, role }, { where: { id } });
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_USER_BY_ID');
    }
}

/**
 * Eliminar un usuario por id
 * @param {*} req
 * @param {*} res
*/

const deleteUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await usersModel.destroy({ where: { id } });
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_USER_BY_ID');
    }
}

module.exports = { getUsers, createUser, getUserById, updateUserById, deleteUserById };
