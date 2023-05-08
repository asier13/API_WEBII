const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { merchantsModel } = require("../models");
const { registerCtrlMerchant } = require("./auth");
const { registerPagina } = require("./webpages");

/**
 * Obtener lista de comercios
 * @param {*} req
 * @param {*} res
*/

const getMerchants = async (req, res) => {
    try{
        const data = await merchantsModel.findAll();
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_GET_MERCHANTS');
    }
}

/**
 * Obtener un comercio por id
 * @param {*} req
 * @param {*} res
*/

const getMerchantById = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await merchantsModel.findOne({ where: { id } });
        res.send(data);
    }catch(err){
        handleHttpError(res, "ERROR_GET_MERCHANT_BY_ID");
    }
}

/**
 * Registrar un comercio
 * @param {*} req
 * @param {*} res
*/

const registerMerchant = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { nombre, email, password, direccion, ciudad } = req.body;
        const dataMerchant = await merchantsModel.create({ nombre, email, password, direccion, ciudad });
        const reqUser = {
            name: nombre,
            age:-1,
            email,
            password,
            role: "merchant"
        }
        const resUser = res;
        await registerCtrlMerchant(reqUser, resUser);
        const pagina = {
            idMerchant: dataMerchant.id,
            ciudad,
            actividad: "",
            titulo: "",
            resumen: ""
        }
        let varObj = {
            id: 1
        }
        await registerPagina(pagina, varObj);
        const data = {
            idpagina : varObj.id,
            merchant: dataMerchant
        }
        res.send(data);
    }catch(err){
        handleHttpError(res, "ERROR_REGISTER_MERCHANT");
    }
}

/**
 * Actualizar un comercio por id
 * @param {*} req
 * @param {*} res
*/

const updateMerchantById = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { nombre, email, password, direccion, ciudad } = req.body;
        const data = await merchantsModel.update({ nombre, email, password, direccion, ciudad }, { where: { id } });
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_MERCHANT_BY_ID');
    }
}

/**
 * Eliminar un comercio por id
 * @param {*} req
 * @param {*} res
*/

const deleteMerchantById = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await merchantsModel.destroy({ where: { id } });
        res.send(data);
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_MERCHANT_BY_ID');
    }
}

module.exports = { getMerchants, getMerchantById, registerMerchant, updateMerchantById, deleteMerchantById };
