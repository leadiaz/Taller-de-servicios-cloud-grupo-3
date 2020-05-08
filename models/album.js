"use strict";
exports.__esModule = true;
var track_1 = require("./track");
var trackExcepcion_1 = require("../Exceptions/trackExcepcion");
var idGenerator_1 = require("./idGenerator");
var Album = /** @class */ (function () {
    function Album(idArtist, id, name, year, tracks) {
        this.idArtist = idArtist;
        this.id = id;
        this.name = name;
        this.year = year;
        this.tracks = tracks;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.tracks = new Array();
    }
    Album.prototype.toJSON = function () {
        return { idArtist: this.idArtist, id: this.id, name: this.name, year: this.year, tracks: this.tracks };
    };
    Album.prototype.addTrack = function (trackData) {
        if (this.existeTrack(trackData.name)) {
            throw new trackExcepcion_1.TrackExistsInAlbumError(trackData.name);
        }
        else {
            var track = new track_1.Track();
            track.idAlbum = this.id;
            track.name = trackData.name;
            track.duration = trackData.duration;
            track.genres = !trackData.genres ? new Array() : trackData.genres;
            this.tracks.push(track);
            return track;
        }
    };
    Album.prototype.removeTracks = function () {
        this.tracks = null;
    };
    Album.prototype.removeTrack = function (anTrack) {
        var index = this.tracks.indexOf(anTrack);
        this.tracks.splice(index, 1);
    };
    Album.prototype.existeTrack = function (name) {
        return this.tracks.some(function (track) { return track.name === name; });
    };
    return Album;
}());
exports.Album = Album;
