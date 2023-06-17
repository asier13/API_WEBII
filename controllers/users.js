const { matchedData } = require("express-validator");
const { modelUsers } = require("../models");
const { handleError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJWT");

const createUser = async (req, res) => {

  req = matchedData(req); 
  const password = await encrypt(req.password);
  const body = { ...req, password };
  try {
    const dataUser = await modelUsers.create(body);
    dataUser.set("password", undefined, { strict: false }); 

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (error) {
    handleError(res, "ERROR_CREATE_USER");
  }
};


const loginUser = async (req, res) => {
  req = matchedData(req);
  const { email, password } = req;
  try {
    const user = await modelUsers
      .findOne({ email })
      .select("password name role email"); 

    if (!user) {
      return handleError(res, "LOGIN_FAILED_INVALID_CRED", 401);
    }

    const isMatch = await compare(password, user.password); 

    if (!isMatch) {
      return handleError(res, "LOGIN_FAILED_INVALID_CRED", 401);
    }

    user.set("password", undefined, { strict: false }); 

    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (error) {
    console.log(error);
    handleError(res, "ERROR_LOGIN_USER");
  }
};


const getUsersByCity = async (req, res) => {
  const { city } = req.params; 
  try {
    const users = await modelUsers.find({ city, allowOffers: true });
    res.send({ users });
  } catch (error) {
    handleError(res, "ERROR_GET_USERS_CITY");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    if (id.toString() !== user._id.toString()) {
      handleError(res, "ERROR_NOT_YOUR_USER");
      return;
    }
    updatedUser = req.body;

    if (updatedUser.password) {
      updatedUser.password = await encrypt(updatedUser.password);
    }
    const data = await modelUsers.findByIdAndUpdate(id, updatedUser, {
      new: true, 
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    handleError(res, "ERROR_UPDATE_USER");
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    if (id.toString() !== user._id.toString()) {
      handleError(res, "ERROR_NOT_YOUR_USER");
      return;
    }
    const data = await modelUsers.findByIdAndDelete(id);
    res.send(data);
  } catch (err) {
    handleError(res, "ERROR_DELETE_USER");
  }
};

module.exports = {createUser, updateUser, getUsersByCity, deleteUser, loginUser};