const ServiceLoggly = require('./ServiceLoggly')
const error = require('../Exceptions/excepcionesAPI')


function agregarEvento(req,res){
    console.log('pepepepepepepep')
    const body = req.body;
    if (body.eventName && body.message) {
        console.log('asdsasadsadsa')
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