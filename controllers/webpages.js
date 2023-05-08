const { validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { webpagesModel, usersModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const registerPaginaCompleta = async (req, res) => {
    try{  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const reqOrigin = req;
        req = matchedData(req);
        //validar que el usuario que hace la peticion es admin
        const token = reqOrigin.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
         
        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return;
        }
         
        const query = {
            // _id o id
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }
         
        const useradmin = await usersModel.findOne({where: query});
        if (!useradmin || useradmin.role !== 'admin') {
            handleHttpError(res, "NOT_ADMIN_USER", 401);
            return;
        }

        const idMerchant = useradmin.id;
        const body = {...req,idMerchant};
        const dataPagina = await webpagesModel.create(body);
        
        res.send(dataPagina);
    }catch(err){
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_WEBPAGE");
    }
}

module.exports = { registerPaginaCompleta };
