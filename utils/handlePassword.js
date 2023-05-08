const bcrypt = require('bcrypt');

const generateHash = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const validatePassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

module.exports = { generateHash, validatePassword };
