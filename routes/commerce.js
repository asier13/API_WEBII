const express = require("express");
const {getMerchant, getMerchants, createMerchant, updateMerchant, deleteMerchant, loginMerchant,
} = require("../controllers/commerce");
const {
  validatorCreateMerchant,
  validatorLoginMerchant,
} = require("../validators/commerce");

const { validatorNeedId } = require("../validators/users");
const { authMiddleware } = require("../middleware/authMiddleware");

const { checkRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, checkRole(["admin"]), getMerchants); //ADMIN

router.get("/:id", authMiddleware, checkRole(["admin"]), getMerchant); //ADMIN

router.post("/register", authMiddleware, checkRole(["admin"]), validatorCreateMerchant, createMerchant); 

router.post("/login", validatorLoginMerchant, loginMerchant); //MERCHANT

router.put("/:id", authMiddleware, checkRole(["admin"]), validatorNeedId, updateMerchant); 

router.delete("/:id", authMiddleware, checkRole(["admin"]), validatorNeedId, deleteMerchant); //ADMIN

module.exports = router;