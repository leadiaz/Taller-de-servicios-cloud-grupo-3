"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ArtistExistsWithThatName = /** @class */ (function (_super) {
    __extends(ArtistExistsWithThatName, _super);
    function ArtistExistsWithThatName(nameArtist) {
        var _this = _super.call(this, "Ya existe un artista con el nombre de " + nameArtist) || this;
        _this.name = "ArtistExistsWithThatName";
        return _this;
    }
    return ArtistExistsWithThatName;
}(Error));
exports.ArtistExistsWithThatName = ArtistExistsWithThatName;
var ArtistExcepcion = /** @class */ (function (_super) {
    __extends(ArtistExcepcion, _super);
    function ArtistExcepcion(nameArtist) {
        var _this = _super.call(this, "No existe el artista con este id: " + nameArtist) || this;
        _this.name = "ArtistError";
        return _this;
    }
    return ArtistExcepcion;
}(Error));
exports.ArtistExcepcion = ArtistExcepcion;
