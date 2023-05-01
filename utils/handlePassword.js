const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin cifrar
 * @param {*} clearPassword
 */
const encrypt = async (clearPassword) => {
  const hash = await bcryptjs.hash(clearPassword, 10);
  return hash;
};

/**
 * Pasa contraseña en claro y contraseña cifrada (hashed)
 * @param {*} clearPassword
 * @param {*} hashedPassword
 */
const compare = async (clearPassword, hashedPassword) => {
  const result = await bcryptjs.compare(clearPassword, hashedPassword);
  return result;
};

module.exports = { encrypt, compare };
