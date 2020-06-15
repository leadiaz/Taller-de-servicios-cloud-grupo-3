'use strict';
class ArtistExistsWithThatName extends Error{
    constructor(name){
        super('Ya existe un artista con ese nombre ' + name);
        this.name = 'ArtistExistsWithThatName';
    }
}

class ArtistExcepcion extends Error{
     
    constructor(){
        super('No existe le artista');
        this.name = 'ArtistExcepcion';
    }
}

module.exports = {
    ArtistExcepcion,
    ArtistExistsWithThatName
};