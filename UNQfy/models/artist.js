'use strict';
exports.__esModule = true;
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const albumException_1 = require('../Exceptions/albumException');
const Artist = /** @class */ (function () {
    function Artist(name, country) {
        this.name = name;
        this.country = country;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.albums = [];
    }
    Artist.prototype.toJSON = function () {
        return { id: this.id, name: this.name, country: this.country, albums: this.albums };
    };
    Artist.prototype.addAlbum = function (album) {
        if (this.existeAlbum(album.name)) {
            throw new albumException_1.AlbumExistsInArtistError(album.name);
        }
        else {
            this.albums.push(album);
        }
    };
    Artist.prototype.getTracks = function () {
        return this.albums.reduce((accumulator, album) => { return accumulator.concat(album.tracks); }, []);
    };
    Artist.prototype.removeAlbum = function (anAlbum) {
        const album = this.albums.find((album) => { return album.id === anAlbum.id; });
        if (!album) {
            throw new albumException_1.NotExistAlbumError(anAlbum.name);
        }
        else {
            const index = this.albums.indexOf(album);
            album.removeTracks();
            this.albums.splice(index, 1);
        }
    };
    Artist.prototype.removeAlbums = function () {
        this.albums.forEach((album) => {
            album.removeTracks();
        });
        this.albums = [];
    };
    Artist.prototype.existeAlbum = function (name) {
        return this.albums.some((album) => { return album.name === name; });
    };
    Artist.prototype.update = function (body) {
        this.name = body.name;
        this.country = body.country;
    };
    return Artist;
}());
exports.Artist = Artist;
var idGenerator_1 = require('./idGenerator');
