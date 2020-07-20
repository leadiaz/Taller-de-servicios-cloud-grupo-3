const rp = require('request-promise');
const { response } = require('express');
const URLLoggly = "http://localhost:9000/api/loggly/state"
const URLNotificador = ""
const UrlUNQFY = ""
const url = require('../wookUrl.json')

const urlGRUPO3 = url.URLGRUPO3

class Monitor {
    servers = new Array()
    fallenserver = new Array()
    constructor() {
        this.state = true;
        this.servers.push({ stateServer: "", name: 'Logger' });
        this.servers.push({ stateServer: "", name: 'UNQfy' });
        this.servers.push({ stateServer: "", name: 'Notificador' });
    }

    servidoresActivos() {
      return this.servers.every(server => server.stateServer === "Funcionando" )
    }

    activarMonitoreo() {
        this.state = true;
    }

    desactivarMonitoreo() {
        this.state = false;
    }

   obtenerHora(){
       const hoy  = new Date()
       const hora = hoy.getHours() + ':' + hoy.getMinutes() 
       return hora
   }

    notificarASlackFalla(nameService) {
        const messege = `${this.obtenerHora()} El servicio ${nameService} ha dejado de funcionar`
        this.postMessage(messege,nameService)
    }


    postMessage(message,nameService) {
        const options = {
            url: urlGRUPO3,
            body: {
                text: message,
            },

            json: true,
        };
        rp.post(options).then(response => {
            console.log("envie el mensaje mostro");
        }).catch(err => {
           this.eliminarServerName(nameService)
        });
    }


    eliminarServerName(serverName) {
        if( this.fallenserver.indexOf(serverName) >= 0){
            this.fallenserver.splice(indice,1)
        }
    }

    stateDeServiceLoggly() {
        const options = {
            url: URLLoggly,
            json: true
        }
        return rp.get(options).then(body =>{
          this.servers[0].stateServer = body.state
        })
        .catch(response => {
            this.servers[0].stateServer = "No funcionando"
        })
    }


    stateDeServiceNotificador() {
        const options = {
            url: URLNotificador,
            json: true
        }
        return rp.get(options).then(body=>{
            this.servers[2].stateServer = body.state
        })
        .catch(response => {
            this.servers[2].stateServer = "No funcionando"
        })
    }

    stateDeUnqfy() {
        const options = {
            url: UrlUNQFY,
            json: true
        }
        return rp.get(options).then(body=>{
            this.servers[1].stateServer = body.state
        })
        .catch(response => {
            this.servers[1].stateServer = "No funcionando"
        })
    }

   

    async monitoreo() {
        await this.stateDeServiceLoggly()
        await this.stateDeServiceNotificador()
        await this.stateDeUnqfy()
        this.servers.forEach(server => {
            if(server.stateServer == "No Funcionando"){
                this.avisarServicioNoFuncionando(server.nameService)
            }else{
                this.avisarServicioVolvioAFuncionar(server.nameService)
            }
            
        });
    }

    

    avisarServicioNoFuncionando(serverName){
        if(this.fallenserver.indexOf(serverName) < 0){
            this.fallenserver.push(serverName)
            this.notificarASlackFalla(serverName)
        }
    }

    avisarServicioVolvioAFuncionar(serverName){
        if(this.fallenserver.indexOf(serverName)>= 0){
            this.notificarASlackNormalidad(serverName)
        }
        
    }



    notificarASlackNormalidad(serverName){
        const messege = `${this.obtenerHora()} El servicio ${nameService} ha vuelto a la normalidad `
        this.postMessage(messege,serverName)
        eliminarServerName(serverName)
    }


}



const pepe = new Monitor()
pepe.monitoreo()
pepe.stateDeServiceLoggly()


module.exports = {
    Monitor
}
