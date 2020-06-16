
const JSONERROR = require('../Exceptions/jsonException');
const ERROR_API = require('../Exceptions/excepcionesAPI');

function errorHalder(error,req,res,next){
    if(error instanceof ERROR_API.NotFound) {
        res.status(404).json({
            status: 404,
            errorCode: 'RESOURCE_NOT_FOUND'
        });
    }else{
        if(error instanceof ERROR_API.Duplicate){
            res.status(409).json({
                status: 409,
                errorCode: 'RESOURCE_ALREADY_EXISTS'
            });
                
        }else{
            if(error instanceof JSONERROR.JSONException){
                res.status(404).json({
                    status: 400,
                    errorCode: 'BAD_REQUEST'
                });
            }
        }
    }
}

module.exports = errorHalder;