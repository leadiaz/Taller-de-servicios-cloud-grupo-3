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
function modifyState(req,res) {
    const body = req.body 
    if(body.newState == "activar") {
        ServicioLoggly.activar()
        res.status(201)<
        res.json({result: "El servidor se ha activado"})
    }
    else {
        console.log('asddasasdasdsa')
        ServicioLoggly.desactivar()
        res.status(201)
        res.json({result: "El servidor se ha desactivado"})
    }
}


module.exports = {
    agregarEvento,
    modifyState,
}