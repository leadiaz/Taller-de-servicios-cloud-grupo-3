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
var AlbumExistsInArtistError = /** @class */ (function (_super) {
    __extends(AlbumExistsInArtistError, _super);
    function AlbumExistsInArtistError(albumName) {
        var _this = _super.call(this, "El album " + albumName + " ya existe en este artista") || this;
        _this.name = "AlbumExistsInArtistError";
        return _this;
    }
    return AlbumExistsInArtistError;
}(Error));
exports.AlbumExistsInArtistError = AlbumExistsInArtistError;
var NotExistAlbumError = /** @class */ (function (_super) {
    __extends(NotExistAlbumError, _super);
    function NotExistAlbumError(albumName) {
        var _this = _super.call(this, "No existe el album " + albumName) || this;
        _this.name = 'NotExistAlbumError';
        return _this;
    }
    return NotExistAlbumError;
}(Error));
exports.NotExistAlbumError = NotExistAlbumError;
