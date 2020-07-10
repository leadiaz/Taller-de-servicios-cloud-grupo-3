'use strict';
exports.__esModule = true;
const idGenerator_1 = require('./idGenerator');
const User = /** @class */ (function () {
    function User(name) {
        this.id = idGenerator_1.IdGenerator.getNextId();
        this.tracks = [];
        this.name = name;
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
        let n = 0;
        this.tracks.forEach((track) => { if (track === aTrack) {
            n = n + 1;
        } });
        return n;
    };
    return User;
}());
exports.User = User;
