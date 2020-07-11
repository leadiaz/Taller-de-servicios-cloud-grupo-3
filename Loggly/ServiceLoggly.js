const  winston  = require('winston');
const  {Loggly} = require('winston-loggly-bulk');
winston.add(new Loggly({
    token: "471fa208-9af4-407d-bffd-09bfc88cadaf",
    subdomain: "SUBDOMAIN",
    tags: ["Winston-NodeJS"],
    json: true
}));
winston.log('info', "HOlaaaaaaaaaaaaaaaa World from Node.js!");