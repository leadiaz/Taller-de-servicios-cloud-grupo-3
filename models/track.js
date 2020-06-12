"use strict";
exports.__esModule = true;
var idGenerator_1 = require("./idGenerator");
var musixMatch_1 = require("./musixMatch");
var Track = /** @class */ (function () {
    function Track(idAlbum, id, name, duration, genres, lyrics) {
        this.idAlbum = idAlbum;
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.genres = genres;
        this.lyrics = lyrics;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.genres = new Array();
    }
    Track.prototype.toJSON = function () {
        return { idAlbum: this.idAlbum, id: this.id, name: this.name, duration: this.duration, genres: this.genres };
    };
    //Dado un array de Genres retorna true si el track contiene algun genre 
    Track.prototype.anyGenre = function (genres) {
        var _this = this;
        return genres.some(function (genre) { return _this.genres.includes(genre); });
    };
    Track.prototype.getLyrics = function () {
        if (this.lyrics == null) {
            this.buscarLyrics();
            return this.lyrics;
        }
        else {
            return this.lyrics;
        }
    };
    Track.prototype.buscarLyrics = function () {
        var _this = this;
        musixMatch_1.letraDeUnTema(this.name).then(function (lyrics) { return _this.lyrics = lyrics; });
    };
    return Track;
}());
exports.Track = Track;
