"use strict";
exports.__esModule = true;
var rp = require('request-promise');
var unqfy = require('../endpoints').unqfy;
var API = unqfy;
var errors = require('./Exceptions/excepcionesAPI');
var ServerInternalError = errors.InternalServerError;
var Observable = /** @class */ (function () {
    function Observable() {
    }
    Observable.prototype.change = function (artista, album) {
        this.changeAddAlbum(artista, album);
    };
    Observable.prototype.changeAddAlbum = function (artista, album) {
        var options = {
            url: API + '/notify',
            body: {
                artistId: artista.artistId,
                subject: 'Nuevo Album para el artista ' + artista.name,
                message: 'Se ha agregado el album ' + album.name + ' al artista ' + artista.name,
                from: 'pruebawebservices@gmail.com'
            },
            json: true
        };
        rp.post(options)["catch"](function () {
            throw new ServerInternalError();
        });
        console.log(options.url);
    };
    return Observable;
}());
exports.Observable = Observable;
