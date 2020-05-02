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
var TrackExistsInAlbumError = /** @class */ (function (_super) {
    __extends(TrackExistsInAlbumError, _super);
    function TrackExistsInAlbumError(trackName) {
        var _this = _super.call(this, "Ya existe un track con este nombre " + trackName) || this;
        _this.trackName = trackName;
        _this.name = "TrackExistsInAlbumError";
        return _this;
    }
    return TrackExistsInAlbumError;
}(Error));
exports.TrackExistsInAlbumError = TrackExistsInAlbumError;
