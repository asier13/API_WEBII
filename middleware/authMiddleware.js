const { verifyToken } = require("../utils/handleJWT");
const { handleError } = require("../utils/handleError");
const { modelUsers, modelCommerce } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    const token = await getAndVerifyToken(req, res);
    if (!token) return;

    const user = await modelUsers.findById(token._id);
    req.user = user; 

    next(); 
  } catch (err) {
    handleError(res, "NOT_SESSION", 401);
  }
};

const authMiddlewareCommerce = async (req, res, next) => {
  try {
    const token = await getAndVerifyToken(req, res);
    if (!token) return;

    const merchant = await modelCommerce.findById(token._id);
    req.merchant = merchant; 
    
    next(); 
  } catch (err) {
    handleError(res, "NOT_SESSION", 401);
  }
};


const getAndVerifyToken = async (req, res) => {
    if (!req.headers.authorization) {
      handleError(res, "NO_TOKEN", 401);
      return null;
    }
  
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);
  
    if (!dataToken._id) {
      handleError(res, "ERROR_ID_TOKEN", 401);
      return null;
    }
  
    return dataToken;
  }  


const checkRole = (roles) => async (req, res, next) => {
  try {
    const { user } = req;
    console.log(user)
    const rolesByUser = user.role;

    const checkValueRole = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRole) {
      handleError(res, "ERROR_NOT_PERMISSION_REQUIRED");
      return;
    }

    next();
  } catch (error) {
    console.log(error)
    handleError(res, "ERROR_ROLE_PERMISSIONS");
  }
};

const checkMerchantId = async (req, res, next) => {
  try {
    const { merchant } = req;
    const merchantWebPage = merchant.pageId;


    const pageId = req.params.id;

    if (merchantWebPage !== pageId) {
      handleError(res, "ERROR_PERMISSION_NOT_REQUIRED");
      return;
    }

    next();
  } catch (error) {
    console.log(error)
    handleError(res, "ERROR_ROLE_PERMISSIONS");
  }
};

module.exports = { authMiddleware, authMiddlewareCommerce, checkRole, checkMerchantId };
