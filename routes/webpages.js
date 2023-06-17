const express = require("express");
const { uploadContent, getWebPage, getWebPages, getWebPagesByCity, getWebPagesByActivity, getWebPagesByCityAndActivity, deleteWebPage, updateScoring, uploadPhoto, uploadText,
} = require("../controllers/webpages");

const { uploadMiddleware } = require("../utils/handleStorage");

const {
  validatorUploadContent,
  validatorUpdateScoring,
} = require("../validators/webpages");

const { validatorNeedId } = require("../validators/users");

const { checkRole, checkMerchantId } = require("../middleware/authMiddleware");
const { authMiddleware, authMiddlewareCommerce } = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", getWebPages); 

router.get("/:id", getWebPage);

router.get("/search/:city/:sort?", getWebPagesByCity); 

router.get("/search/:activity/:sort?", getWebPagesByActivity); 

router.get("/search/:city/:activity/:sort?", getWebPagesByCityAndActivity); 

router.post("/:id", authMiddlewareCommerce, checkMerchantId, validatorUploadContent, uploadContent); 

router.patch("/:id", authMiddleware, checkRole(["user", "admin"]), validatorUpdateScoring, updateScoring);

router.post("/:id/photos", authMiddlewareCommerce, checkMerchantId, uploadMiddleware.single("image"), uploadPhoto);

router.post("/:id/texts", authMiddlewareCommerce, checkMerchantId, uploadText); 

router.delete("/:id", authMiddlewareCommerce, checkMerchantId, validatorNeedId, deleteWebPage); 

module.exports = router;