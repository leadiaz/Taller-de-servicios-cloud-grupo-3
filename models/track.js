"use strict";
exports.__esModule = true;
var idGenerator_1 = require("./idGenerator");
var Track = /** @class */ (function () {
    function Track(idAlbum, id, name, duration, genres) {
        this.idAlbum = idAlbum;
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.genres = genres;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.genres = new Array();
    }
    Track.prototype.toJSON = function () {
        return { idAlbum: this.idAlbum, id: this.id, name: this.name, duration: this.duration, genres: this.genres };
    };
    Track.prototype.anyGenre = function (genres) {
        var _this = this;
        return genres.some(function (genre) { return _this.genres.includes(genre); });
    };
    return Track;
}());
exports.Track = Track;
