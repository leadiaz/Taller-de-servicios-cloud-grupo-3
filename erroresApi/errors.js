
const JSONERROR = require('../Exceptions/jsonException');
const ERROR_API = require('../Exceptions/excepcionesAPI');

function errorHalder(error,req,res,next){
    console.log(error)
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
                res.status(400).json({
                    status: 400,
                    errorCode: 'BAD_REQUEST'
                });
            }
            else{
                if(error instanceof  ERROR_API.RELATED_RESOURCE_NOT_FOUND){

                       res.status(404).json({
                        status: 404,
                        errorCode: "RELATED_RESOURCE_NOT_FOUND"
                        })
                        


            }else{
                if(error.type == 'entity.parse.failed'){
                    res.status(400).json({
                        status: 400,
                        errorCode: 'BAD_REQUEST'
                        })            
         

                }else{
                    if(error instanceof ERROR_API.RESOURCE_NOT_FOUND){
                        res.status(404).json( {
                            status: 404,
                            errorCode: "RESOURCE_NOT_FOUND"
                            })
                            
                    }
                }  
            }

            }
                
            
        }
    }
}



module.exports = errorHalder;