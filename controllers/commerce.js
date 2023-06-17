const { matchedData } = require("express-validator");
const { modelCommerce, modelWebpages } = require("../models");
const { handleError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");
const { tokenSign2 } = require("../utils/handleJWT");
const { encrypt, compare } = require("../utils/handlePassword");


const createMerchant = async (req, res) => {
  req = matchedData(req);
  const password = await encrypt(req.password);
  const body = { ...req, password };
  try {

    const pageId = uuidv4();


    const commerceData = { ...body, pageId };

    const dataMerchant = await modelCommerce.create(commerceData);
    dataMerchant.set("password", undefined, { strict: false }); 

    const data = {
      token: await tokenSign2(dataMerchant),
      merchant: dataMerchant,
    };
    res.send({ data });
  } catch (error) {
    handleError(res, "ERROR_CREATE_MERCHANT");
  }
};

const loginMerchant = async (req, res) => {
  req = matchedData(req);
  const { email, password } = req;
  try {
    const merchant = await modelCommerce
      .findOne({ email })
      .select("password email pageId"); 

    if (!merchant) {
      return handleError(res, "LOGIN_FAILED_INVALID_CRED", 401);
    }

    const isMatch = await compare(password, merchant.password); 
    if (!isMatch) {
      return handleError(res, "LOGIN_FAILED_INVALID_CRED", 401);
    }

    merchant.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign2(merchant),
      merchant,
    };

    res.send({ data });
  } catch (error) {
    console.log(error);
    handleError(res, "ERROR_LOGIN_MERCHANT");
  }
};


const getMerchants = async (req, res) => {
  try {
    const merchants = await modelCommerce.find({});
    res.send({ merchants });
  } catch (error) {
    handleError(res, "ERROR_GET_MERCHANTS");
  }
};


const getMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const merchant = await modelCommerce.findById(id);
    if (!merchant) {
      return handleError(res, "MERCHANT_NOT_FOUND", 404);
    }
    res.send({ merchant });
  } catch (error) {
    handleError(res, "ERROR_GET_MERCHANT");
  }
};

const updateMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMerchant = req.body;
    if (updatedMerchant.password) {
      updatedMerchant.password = await encrypt(updatedMerchant.password);
    }
    const data = await modelCommerce.findByIdAndUpdate(id, updatedMerchant, {
      new: true, 
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    handleError(res, "ERROR_UPDATE_MERCHANT");
  }
};


const deleteMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const commerce = await modelCommerce.findByIdAndDelete(id);
    const pageId = commerce.pageId;
    await modelWebpages.findOneAndDelete({ pageId: pageId });
    res.send(commerce);
  } catch (err) {
    console.log(err);
    handleError(res, "ERROR_DELETE_MERCHANT");
  }
};

module.exports = {getMerchant, getMerchants, createMerchant, updateMerchant, deleteMerchant, loginMerchant};