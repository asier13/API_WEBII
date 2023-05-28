const express = require("express");
const {
  getUsersByCity,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");

const {validatorCreateUser, validatorLoginUser, validatorNeedId, } = require("../validators/users");

const { authMiddleware, authMiddlewareCommerce } = require("../middleware/authMiddleware");

const { checkRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:city", authMiddlewareCommerce, getUsersByCity); 

router.post("/register", validatorCreateUser, createUser); 

router.post("/login", validatorLoginUser, loginUser); 

router.put("/:id", authMiddleware, checkRole(["user", "admin"]), validatorNeedId, updateUser); 

router.delete("/:id", authMiddleware, checkRole(["user", "admin"]), validatorNeedId, deleteUser); 

module.exports = router;