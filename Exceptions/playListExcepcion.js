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
var NotExistPlayListError = /** @class */ (function (_super) {
    __extends(NotExistPlayListError, _super);
    function NotExistPlayListError(playListName) {
        var _this = _super.call(this, 'No existe el playList' + playListName) || this;
        _this.name = 'NotExistPlayListError';
        return _this;
    }
    return NotExistPlayListError;
}(Error));
exports.NotExistPlayListError = NotExistPlayListError;
