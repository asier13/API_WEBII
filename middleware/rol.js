const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const userRol = user.role;
        const checkValueRol = roles.includes(userRol);
        if (!checkValueRol) {
            handleHttpError(res, "NO_PERMITIDO", 403);
            return;
        }
        next();
    } catch (err) {
        handleHttpError(res, "ERROR_PERMISOS", 403);
    }
};

module.exports = checkRol;
