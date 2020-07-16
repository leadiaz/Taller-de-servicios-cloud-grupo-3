const  winston  = require('winston');
const  {Loggly} = require('winston-loggly-bulk');
const Logger = require('./Logger');

winston.add(new Loggly({
    token: "471fa208-9af4-407d-bffd-09bfc88cadaf",
    subdomain: "SUBDOMAIN",
    tags: ["Winston-NodeJS"],
    json: true,
    level: ["debug","warning"],
}));


class LogglyService {
    constructor() {
        this.state = true;
    }

     
    activar(){
        this.state = true;
    }

    desactivar(){
        this.state = false;
    }

    estadoLoggly() {
        if(this.state) {
            return "El servidor Loggly se encuentra activado"
        }
        else{
            return "El servidor Loggly se encuetra desactivado"
        }
    }
     loguearEvento(nivel,message) {
        winston.log(nivel,message)
        if (nivel === "warning") {
            Logger.warn(message)
            winston.warn(message)
        }else{
            Logger.log(nivel,message)
        }    
    }
    
}

module.exports = { LogglyService}