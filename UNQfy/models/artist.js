"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var albumException_1 = require("../Exceptions/albumException");
var observable_1 = require("./observable");
var Artist = /** @class */ (function (_super) {
    __extends(Artist, _super);
    function Artist(name, country) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.country = country;
        _this.id = idGenerator_1.IdGenerator.getNextId();
        _this.albums = [];
        return _this;
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
            this.notify(this, album, true);
        }
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
}(observable_1.Observable));
exports.Artist = Artist;
var idGenerator_1 = require("./idGenerator");
