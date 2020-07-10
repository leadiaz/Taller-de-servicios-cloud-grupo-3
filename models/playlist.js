'use strict';
exports.__esModule = true;
const idGenerator_1 = require('./idGenerator');
const Playlist = /** @class */ (function () {
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
        const _this = this;
        // var item = items[Math.floor(Math.random() * items.length)];
        let n = 0;
        tracks.forEach((track) => {
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
