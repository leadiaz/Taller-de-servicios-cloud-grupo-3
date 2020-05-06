"use strict";
exports.__esModule = true;
var idGenerator_1 = require("./idGenerator");
var Playlist = /** @class */ (function () {
    function Playlist(id, name, tracks) {
        this.id = id;
        this.name = name;
        this.tracks = tracks;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.tracks = new Array();
    }
    Playlist.prototype.toJSON = function () {
        return { id: this.id, name: this.name, tracks: this.tracks };
    };
    Playlist.prototype.duration = function () {
        return 0;
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
            }
        });
    };
    Playlist.prototype.removeAtrack = function (aTrack) {
        this.tracks.splice(this.tracks.indexOf(aTrack), 1);
    };
    return Playlist;
}());
exports.Playlist = Playlist;
