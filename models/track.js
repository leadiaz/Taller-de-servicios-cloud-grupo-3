"use strict";
exports.__esModule = true;
var Track = /** @class */ (function () {
    function Track(id, name, duration, genres) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.genres = genres;
        this.genres = new Array();
    }
    Track.prototype.anyGenre = function (genres) {
        var _this = this;
        return genres.some(function (genre) { return _this.genres.includes(genre); });
    };
    return Track;
}());
exports.Track = Track;
