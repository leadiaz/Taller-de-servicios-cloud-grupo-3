/* eslint-disable @typescript-eslint/no-var-requires */

const ERROR_API = require('../Exceptions/excepcionesAPI');

function errorHalder(err,req,res,next){
    if(err instanceof ERROR_API.APIError){
        res.status(err.status).json({
            status: err.status, 
            errorCode: err.errorCode
        });
    }else{
        if(err.type == 'entity.parse.failed'){
            res.status(err.status).json({
                status: err.status,
                errorCode: 'BAD_REQUEST'
            });           
        }else{
            res.status(500);
            res.json({status: 500, errorCode: 'INTERNAL_SERVER_ERROR'});   
            next(err); 
        } 
    }
}



module.exports = errorHalder;