"use strict";
exports.__esModule = true;
var picklify = require('picklify'); // para cargar/guarfar unqfy
var fs = require('fs'); // para cargar/guarfar unqfy
var UNQfy = /** @class */ (function () {
    function UNQfy() {
    }
    // artistData: objeto JS con los datos necesarios para crear un artista
    //   artistData.name (string)
    //   artistData.country (string)
    // retorna: el nuevo artista creado
    UNQfy.prototype.addArtist = function (artistData) {
        /* Crea un artista y lo agrega a unqfy.
        El objeto artista creado debe soportar (al menos):
          - una propiedad name (string)
          - una propiedad country (string)
        */
    };
    // albumData: objeto JS con los datos necesarios para crear un album
    //   albumData.name (string)
    //   albumData.year (number)
    // retorna: el nuevo album creado
    UNQfy.prototype.addAlbum = function (artistId, albumData) {
        /* Crea un album y lo agrega al artista con id artistId.
          El objeto album creado debe tener (al menos):
           - una propiedad name (string)
           - una propiedad year (number)
        */
    };
    // trackData: objeto JS con los datos necesarios para crear un track
    //   trackData.name (string)
    //   trackData.duration (number)
    //   trackData.genres (lista de strings)
    // retorna: el nuevo track creado
    UNQfy.prototype.addTrack = function (albumId, trackData) {
        /* Crea un track y lo agrega al album con id albumId.
        El objeto track creado debe tener (al menos):
            - una propiedad name (string),
            - una propiedad duration (number),
            - una propiedad genres (lista de strings)
        */
    };
    UNQfy.prototype.getArtistById = function (id) {
    };
    UNQfy.prototype.getAlbumById = function (id) {
    };
    UNQfy.prototype.getTrackById = function (id) {
    };
    UNQfy.prototype.getPlaylistById = function (id) {
    };
    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    UNQfy.prototype.getTracksMatchingGenres = function (genres) {
    };
    // artistName: nombre de artista(string)
    // retorna: los tracks interpredatos por el artista con nombre artistName
    UNQfy.prototype.getTracksMatchingArtist = function (artistName) {
    };
    // name: nombre de la playlist
    // genresToInclude: array de generos
    // maxDuration: duración en segundos
    // retorna: la nueva playlist creada
    UNQfy.prototype.createPlaylist = function (name, genresToInclude, maxDuration) {
        /*** Crea una playlist y la agrega a unqfy. ***
          El objeto playlist creado debe soportar (al menos):
            * una propiedad name (string)
            * un metodo duration() que retorne la duración de la playlist.
            * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
        */
    };
    UNQfy.prototype.save = function (filename) {
        var listenersBkp = this.listeners;
        this.listeners = [];
        var serializedData = picklify.picklify(this);
        this.listeners = listenersBkp;
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    };
    UNQfy.load = function (filename) {
        var serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
        var classes = [UNQfy];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    };
    return UNQfy;
}());
exports.UNQfy = UNQfy;
