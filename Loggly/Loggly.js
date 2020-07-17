const  winston  = require('winston');
const  {Loggly} = require('winston-loggly-bulk');
const Logger = require('./Logger');




class LogglyService {
    constructor() {
        this.state = true;
        this.configuracionWinston();
    }

    configuracionWinston(){
        winston.add(new Loggly({
            token: '471fa208-9af4-407d-bffd-09bfc88cadaf',
            subdomain: 'SUBDOMAIN',
            tags: ['Winston-NodeJS'],
            level: 'debug',
            json: true,
        }));
    }
  

     
    activar(){
        this.state = true;
    }

    desactivar(){
        this.state = false;
    }

    estadoLoggly() {
        if(this.state) {
            return 'Funcionando';
        }
        else{
            return 'No funcionando';
        }
    }

    loguearEvento(nivel,message) {
        
        if (nivel === 'warning') {
            Logger.warn(message);
            winston.warn(message);
        
        }else{
           
            Logger.log(nivel,message);
            winston.log(nivel,message);

        }    
    }
    
}

module.exports = { LogglyService};