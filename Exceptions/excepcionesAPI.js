'use strict';
class NotFound extends Error{
    constructor(tipo){
        super('No existe '+tipo);
        this.name = 'NotFound';
    }
}

class Duplicate extends Error{
    constructor(tipo){
        super(tipo + ' Duplicado');
        this.name = 'Duplicate';
    }
}

module.exports= {
    NotFound,
    Duplicate
}