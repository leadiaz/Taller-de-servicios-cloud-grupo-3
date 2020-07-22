"use strict";
exports.__esModule = true;
var Notificador = require('../../Notification/notificador');
var notificador = new Notificador.Notificador();
var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [notificador];
    }
    Observable.prototype.notify = function (artista, album) {
        this.observers.forEach(function (observer) {
            observer.update(artista, album);
        });
    };
    return Observable;
}());
exports.Observable = Observable;
