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

class RELATED_RESOURCE_NOT_FOUND extends Error {
    constructor(tipo){
        super('No existe '+tipo);
        this.name = 'RELATED_RESOURCE_NOT_FOUND';
    }
}
class RESOURCE_NOT_FOUND extends Error {
    constructor(tipo){
        super('Invalida '+tipo);
        this.name = 'RESOURCE_NOT_FOUND';
    }
}

module.exports= {
    NotFound,
    Duplicate,
    RELATED_RESOURCE_NOT_FOUND,
    RESOURCE_NOT_FOUND
}