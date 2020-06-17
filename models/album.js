"use strict";
exports.__esModule = true;
var idGenerator_1 = require("./idGenerator");
var Album = /** @class */ (function () {
    function Album(idArtist, name, year) {
        this.idArtist = idArtist;
        this.name = name;
        this.year = year;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.tracks = [];
    }
    Album.prototype.toJSON = function () {
        return { id: this.id, name: this.name, year: this.year, tracks: this.tracks };
    };
    Album.prototype.addTrack = function (track) {
        // if(this.existeTrack(track.name)){
        //   throw new TrackExistsInAlbumError(track.name)
        // }
        this.tracks.push(track);
    };
    Album.prototype.removeTracks = function () {
        this.tracks = [];
    };
    Album.prototype.removeTrack = function (anTrack) {
        var index = this.tracks.indexOf(anTrack);
        this.tracks.splice(index, 1);
    };
    Album.prototype.existeTrack = function (name) {
        return this.tracks.some(function (track) { return track.name === name; });
    };
    Album.prototype.updateYear = function (year) {
        this.year = year;
    };
    return Album;
}());
exports.Album = Album;
