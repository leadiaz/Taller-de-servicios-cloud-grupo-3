"use strict";
exports.__esModule = true;
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var albumException_1 = require("../Exceptions/albumException");
var Notificador = require('../../Notification/notificador');
var notificador = new Notificador.Notificador();
var Artist = /** @class */ (function () {
    function Artist(name, country) {
        this.name = name;
        this.country = country;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.albums = [];
        this.observers = [notificador];
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
            this.notify(album);
        }
    };
    Artist.prototype.notify = function (album) {
        var _this = this;
        this.observers.forEach(function (observer) {
            observer.update(_this, album);
        });
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
        this.albums = [];
    };
    Artist.prototype.existeAlbum = function (name) {
        return this.albums.some(function (album) { return album.name === name; });
    };
    Artist.prototype.update = function (body) {
        this.name = body.name;
        this.country = body.country;
    };
    return Artist;
}());
exports.Artist = Artist;
var idGenerator_1 = require("./idGenerator");
