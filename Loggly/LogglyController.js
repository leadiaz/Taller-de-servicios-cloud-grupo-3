const error = require('../Exceptions/excepcionesAPI')
const LogglyService = require ('./Loggly')
const ServicioLoggly = new LogglyService.LogglyService()


function agregarEvento(req,res){
    if(ServicioLoggly.state) {
    const body = req.body;
    if (body.eventName && body.message) {
        ServicioLoggly.loguearEvento(body.eventName,body.message)
        res.status(201);
        res.json({result : "El evento fue registrado exitosamente"}); 
    }else{
       throw new error.JSONException();

    }}else {
        res.status(400)
        res.json({message: "El servidor se encuentra desactivado"})
    }

}

function activarLoggly(req,res) {
        ServicioLoggly.activar()
        res.status(201)<
        res.json({result: "El servidor se ha activado"})
}

function desactivarLoggly(req,res){
    ServicioLoggly.desactivar()
    res.status(201)
    res.json({result: "El servidor se ha desactivado"})

}

function stateLoggly(req,res){
    res.status(200)
    res.json({stateLoggly: ServicioLoggly.estadoLoggly()})
}


module.exports = {
    agregarEvento,
    activarLoggly,
    desactivarLoggly,
    stateLoggly,
}