const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const fs = require('fs');
const path = require('path');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = path.join(__dirname, '..', 'storage');

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_LIST_ITEMS');
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
    const data = await storageModel.findById(id);
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_GET_ITEM');
  }
};

/**
 * Inserta o actualiza un registro
 * @param {*} req 
 * @param {*} res 
 */
const saveItem = async (req, res) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const fileData = { 
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    };
    let data;
    if (id) {
      data = await storageModel.findByIdAndUpdate(id, fileData, { new: true });
    } else {
      data = await storageModel.create(fileData);
    }
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_DETAIL_ITEM');
  }
};

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne({ _id: id });
    const filePath = path.join(MEDIA_PATH, dataFile.filename);
    fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: true
    };
    res.send(data);
  } catch(err) {
    handleHttpError(res, 'ERROR_GET_ITEM');
  }
};

/**
 * Descargar un archivo
 * @param {*} req 
 * @param {*} res 
 */
const downloadItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    const filePath = path.join(MEDIA_PATH, data.filename);
    res.download(filePath);
  } catch(err) {
    handleHttpError(res, 'ERROR_DOWNLOAD_ITEM');
  }
};

module.exports = { getItems, getItem, saveItem, deleteItem, downloadItem };
