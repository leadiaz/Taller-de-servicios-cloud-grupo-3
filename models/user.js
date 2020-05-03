"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(name, id, tracks) {
        this.name = name;
        this.id = id;
        this.tracks = tracks;
        this.tracks = new Array();
    }
    //El usuario escucha un tema
    User.prototype.listenTrack = function (aTrack) {
        this.tracks.push(aTrack);
    };
    User.sinRepetidos = function (list) {
        var xs = new Array();
        list.forEach(function (elem) { if (!xs.includes(elem)) {
            xs.push(elem);
        } });
        return xs;
    };
    //Denota: Los temas escuchado por un usuario
    User.prototype.songsHeard = function () {
        return User.sinRepetidos(this.tracks);
    };
    //Denota: las veces que un usuario escucho un tema 
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
