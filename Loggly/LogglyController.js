const ServiceLoggly = require('./ServiceLoggly')
const error = require('../Exceptions/excepcionesAPI')


function agregarEvento(req,res){
    const body = req.body;
    if (body.eventName && body.message) {
        ServiceLoggly.loguearEvento(body.eventName,body.message)
        res.status(201);
        res.json({result : "ok"}); 
    }else{
        throw new error.JSONException();

    }

}


module.exports = {
    agregarEvento
}