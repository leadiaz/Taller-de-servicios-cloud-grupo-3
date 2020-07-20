const Monitor = require('./Monitor')
const ServiceMonitor = new Monitor.Monitor()

function servicios(req,res){
  res.json(ServiceMonitor.servers)
  
}


function estadoDeServidores(req,res) {
   if(ServiceMonitor.servidoresActivos()){
     res.status(200)
     res.json({result: "Los servidores se encuentran activos"})
   }else {
     res.status(200)
     res.json({result: "No todos los servidores se encuentran activos"})
   }
  
}
function activarMonitoreo (req,res) {
      ServiceMonitor.activarMonitoreo()
      res.status(201)
      res.json({result:"Se ha activado el monitoreo exitosamente"})
}


function desactivarMonitoreo(req,res){
     ServiceMonitor.desactivarMonitoreo()
     res.status(201)
     res.json({result:"Se ha desactivado el monitoreo exitosamente"})
}


module.exports = {
  estadoDeServidores,
  activarMonitoreo,
  desactivarMonitoreo,
  servicios
}

