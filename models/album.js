"use strict";
exports.__esModule = true;
var Album = /** @class */ (function () {
    function Album(id, name, year, tracks) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.tracks = tracks;
        this.tracks = new Array();
    }
    Album.prototype.addTrack = function (anTrack) {
        this.tracks.push(anTrack);
    };
    return Album;
}());
exports.Album = Album;