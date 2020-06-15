const DuplicatedError = require('./DuplicatedError');
const NotFoundError = require('./NotFoundError')
 

function errorHalder(error,req,res,next){
    if(error.name ===  DuplicatedError.DuplicatedError.name) {
        res.status(409).json({
            status : 409,
            errorCode: "RESOURCE_ALREADY_EXISTS"
        })
    }
    else{
        if(error.name === NotFoundError.NotFoundError.name) {
            res.status(404).json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            })
        }else {
            next(error)
        }
    }

}

module.exports = errorHalder;