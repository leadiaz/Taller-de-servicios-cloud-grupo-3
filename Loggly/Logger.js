const {createLogger,format,transports} = require('winston')
//Lo que hace esto es guarda de forma local el log realizado en log-api.text
module.exports =  createLogger({
    format : format.combine(format.simple()),
    transports: [
       new transports.File({
           maxFiles: 5120000,
           maxFiles: 5, 
           filename:  './log-api.text'
       })
    ]
})

