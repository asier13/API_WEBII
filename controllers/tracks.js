const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await tracksModel.findAllData();
    res.send({ data, user });
  } catch(err) {
    handleHttpError(res, 'ERROR_GET_ITEMS');
  }
};

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await tracksModel.findOneData(id);
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_GET_ITEM');
  }
};

/**
 * Inserta un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send(data);
} catch(err) {
handleHttpError(res, 'ERROR_CREATE_ITEM');
}
};

/**

Actualiza un registro
@param {*} req
@param {*} res
*/
const updateItem = async (req, res) => {
try {
const { id } = matchedData(req);
const body = matchedData(req);
const data = await tracksModel.update(id, body);
res.send(data);
} catch(err) {
handleHttpError(res, 'ERROR_UPDATE_ITEM');
}
};
/**

Elimina un registro
@param {*} req
@param {*} res
*/
const deleteItem = async (req, res) => {
try {
const { id } = matchedData(req);
const data = await tracksModel.delete(id);
res.send(data);
} catch(err) {
handleHttpError(res, 'ERROR_DELETE_ITEM');
}
};
module.exports = {getItems,getItem,createItem,updateItem,deleteItem,
};
