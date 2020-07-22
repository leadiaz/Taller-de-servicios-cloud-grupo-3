const  winston  = require('winston');
const  {Loggly} = require('winston-loggly-bulk');
const Logger = require('./Logger');
const endpoints = require('../endpoints');
const apiloggly = endpoints.loggly + '/loggly/event';
const rp = require('request-promise');
const { response } = require('express');



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
        const options = {
            url: apiloggly,
            body: {
                eventName: nivel,
                message: message
            },

            json: true,
        };
        rp.post(options).then(()=>{
            console.log('entraaaaaaaaa?')
            winston.log(nivel,message)
            Logger.log(nivel,message);
        })

        // if (nivel === 'warning') {
        //     Logger.warn(message);
        //     winston.warn(message);   
        // }else{
        //     Logger.log(nivel,message);
        //     winston.log(nivel,message);
        // }

    }

    winston(){
        return winston
    }
    postMessage(message, nameService) {
        rp.post(options).then(response => {
            console.log("envie el mensaje mostro");
        }).catch(err => {
            this.eliminarServerName(nameService)
        });
    }


    
}

module.exports = { LogglyService};