const  winston  = require('winston');
const  {Loggly} = require('winston-loggly-bulk');
const service = require('./Logger');
const Logger = require('./Logger');
const { eventNames } = require('./Logger');

winston.add(new Loggly({
    token: "471fa208-9af4-407d-bffd-09bfc88cadaf",
    subdomain: "SUBDOMAIN",
    tags: ["Winston-NodeJS"],
    json: true
}));

 function loguearEvento(nivel,nameEvent) {
    winston.log(nivel,nameEvent)
    Logger.log(nivel,nameEvent)
}

//winston.log('info', "HOlaaaaaaaaaaaaaaaa World from Node.js!");
//loguearEvento('error',"Se agrego nada acaaaaaaaaaaaaaaaaaaaaaa")
//winston.info('que es esto?')
module.exports = {
    loguearEvento
}

