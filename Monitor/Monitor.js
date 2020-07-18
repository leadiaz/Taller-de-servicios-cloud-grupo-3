const rp = require('request-promise');
const { response } = require('express');
const URLLoggly = "http://localhost:9000/api/loggly/state"
const URLNotificador = ""
const UrlUNQFY = ""

class Monitor  {
   estadoDeApis
   recarga 
   valor = true
    constructor(){
        this.state = true;
        this.pepe()
    }
   
    servidoresActivos(){
     
        
    }

    activarMonitoreo() {
        this.state = true;
        this.valor = true
        this.pepe()
    }

    desactivarMonitoreo(){
        this.state = false;
        this.valor = false;
    }

    notificarASlack(nameService) {
        const hoy = new Date()
        const hora = hoy.getHours() + ':'  + hoy.getMinutes()
        const messege = `${hora} El servicio ${nameService} ha dejado de funcionar`
        this.postMessage(messege)
    }
    postMessage(message){
        console.log(message)
        const options = {
            url: "https://hooks.slack.com/services/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",
            body: {
                text: message,
            },
            
            json: true,
        };
        rp.post(options).then(response => {
            console.log("envie el mensaje mostro");
        }).catch(err => {
            console.log("algo malio sal");
        });
    }

    stateDeServiceLoggly() {
       const options = {
           url: URLLoggly,
           json: true
       }
      return rp.get(options)
    }


    stateDeServiceNotificador() {
        const options = {
            url: URLNotificador,
            json: true
        }
       return rp.get(options)
    }

    stateDeUnqfy(){
        const options = {
            url: UrlUNQFY,
            json: true
        }
       return rp.get(options)
    }
    pepe () {
        if(this.valor){
            this.monitoreo()
            setTimeout(this.pepe.bind(this),1000)
        }

    }


    async monitoreo(){
       const loggly      = await this.stateDeServiceLoggly()
    //    const notificador = await this.stateDeServiceNotificador()
    //    const unqfy       = await this.stateDeUnqfy()
       const apis        = [loggly]
       apis.forEach(service => {
           if(service.stateLoggly == "No funcionando"){
              this.notificarASlack('Loggly')   
              this.estadoDeApis = false       
           }
           else{
               this.estadoDeApis = true
           }
       });
    }
}





module.exports = {
    Monitor
}
