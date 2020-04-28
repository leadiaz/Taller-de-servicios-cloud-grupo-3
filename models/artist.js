"use strict";
exports.__esModule = true;
var Artist = /** @class */ (function () {
    function Artist(id, name, country, albums) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.albums = albums;
        this.albums = new Array();
    }
    Artist.prototype.toJSON = function () {
        return { id: this.id, name: this.name, country: this.country, albums: this.albums };
    };
    Artist.prototype.addAlbum = function (anAlbum) {
        this.albums.push(anAlbum);
    };
    Artist.prototype.getTracks = function () {
        return this.albums.reduce(function (accumulator, album) { return accumulator.concat(album.tracks); }, []);
    };
    return Artist;
}());
exports.Artist = Artist;
