"use strict";
exports.__esModule = true;
var idGenerator_1 = require("./idGenerator");
var Playlist = /** @class */ (function () {
    function Playlist(name) {
        this.name = name;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.tracks = [];
        this.duration = 0;
    }
    Playlist.prototype.toJSON = function () {
        return { id: this.id, name: this.name, tracks: this.tracks };
    };
    Playlist.prototype.hasTrack = function (aTrack) {
        return this.tracks.includes(aTrack);
    };
    Playlist.prototype.addTracks = function (tracks, maxDuration) {
        var _this = this;
        // var item = items[Math.floor(Math.random() * items.length)];
        var n = 0;
        tracks.forEach(function (track) {
            if (n < maxDuration && track.duration < maxDuration) {
                _this.tracks.push(track);
                n = n + track.duration;
                _this.duration += track.duration;
            }
        });
    };
    Playlist.prototype.addTrack = function (track) {
        this.duration += track.duration;
        this.tracks.push(track);
    };
    Playlist.prototype.removeAtrack = function (aTrack) {
        this.tracks.splice(this.tracks.indexOf(aTrack), 1);
    };
    return Playlist;
}());
exports.Playlist = Playlist;
