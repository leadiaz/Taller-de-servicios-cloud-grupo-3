"use strict";
exports.__esModule = true;
var idGenerator_1 = require("./idGenerator");
var User = /** @class */ (function () {
    function User(name, id, tracks) {
        this.name = name;
        this.id = id;
        this.tracks = tracks;
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.tracks = new Array();
    }
    //El usuario escucha un tema
    User.prototype.listenTrack = function (aTrack) {
        this.tracks.push(aTrack);
    };
    //Retorna: Los Tracks escuchado por un usuario
    User.prototype.songsHeard = function () {
        return new Set(this.tracks);
    };
    //Retorna: las veces que un usuario escucho un tema 
    User.prototype.howManyTimesListenTrack = function (aTrack) {
        var n = 0;
        this.tracks.forEach(function (track) { if (track === aTrack) {
            n = n + 1;
        } });
        return n;
    };
    return User;
}());
exports.User = User;
