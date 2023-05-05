const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');
const { commerceModel } = require('../models');

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await commerceModel.findAllData();
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
    const data = await commerceModel.findOneData(id);
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
    const data = await commerceModel.create(body);
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_CREATE_ITEM');
  }
};

/**
 * Actualiza un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const body = matchedData(req);
    const data = await commerceModel.update(id, body);
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_UPDATE_ITEM');
  }
};

/**
 * Elimina un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await commerceModel.delete(id);
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_DELETE_ITEM');
  }
};

/**
 * Buscar productos por diferentes criterios
 * @param {*} req 
 * @param {*} res 
 */
const searchItems = async (req, res) => {
  try {
    const { query, page, limit, sort } = req.query;
    const data = await commerceModel.searchData(query, page, limit, sort);
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_SEARCH_ITEMS');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, searchItems };
