'use strict';
class ArtistExistsWithThatName extends Error{
    constructor(name){
        super('Ya existe un artista con ese nombre ' + name);
        this.name = 'Ya existe un artista con ese nombre ';
    }
}

class ArtistExcepcion extends Error{
     
    constructor(nombreArtista){
        // console.log(name);
        super('No existe le artista con este nombre: '+ nombreArtista);
        this.name = 'No existe le artista';
        // console.log(this.name);
    }
}

module.exports = {
    ArtistExcepcion,
    ArtistExistsWithThatName
};
// exports.ArtistExcepcion = ArtistExcepcion;