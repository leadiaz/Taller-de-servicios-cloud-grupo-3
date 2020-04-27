"use strict";
exports.__esModule = true;
var Playlist = /** @class */ (function () {
    function Playlist(id, name, tracks) {
        this.id = id;
        this.name = name;
        this.tracks = tracks;
        this.tracks = new Array();
    }
    Playlist.prototype.duration = function () {
        return 0;
    };
    Playlist.prototype.hasTrack = function (aTrack) {
        return null;
    };
    Playlist.prototype.addTracks = function (tracks, maxDuration) {
        // var item = items[Math.floor(Math.random() * items.length)];
    };
    return Playlist;
}());
exports.Playlist = Playlist;
