"use strict";
exports.__esModule = true;
var albumException_1 = require("../Exceptions/albumException");
var Artist = /** @class */ (function () {
    function Artist(id, name, country) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.albums = [];
    }
    Artist.prototype.toJSON = function () {
        return { id: this.id, name: this.name, country: this.country, albums: this.albums };
    };
    Artist.prototype.addAlbum = function (album) {
        // if(this.existeAlbum(albumData.name)){
        //     throw new AlbumExistsInArtistError(albumData.name)
        // }else{
        this.albums.push(album);
    };
    Artist.prototype.getTracks = function () {
        return this.albums.reduce(function (accumulator, album) { return accumulator.concat(album.tracks); }, []);
    };
    Artist.prototype.removeAlbum = function (anAlbum) {
        var album = this.albums.find(function (album) { return album.id === anAlbum.id; });
        if (!album) {
            throw new albumException_1.NotExistAlbumError(anAlbum.name);
        }
        else {
            var index = this.albums.indexOf(album);
            album.removeTracks();
            this.albums.splice(index, 1);
        }
    };
    Artist.prototype.removeAlbums = function () {
        this.albums.forEach(function (album) {
            album.removeTracks();
        });
    };
    Artist.prototype.existeAlbum = function (name) {
        return this.albums.some(function (album) { return album.name === name; });
    };
    return Artist;
}());
exports.Artist = Artist;
var idGenerator_1 = require("./idGenerator");
