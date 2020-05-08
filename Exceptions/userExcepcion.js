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
var NoExistUserError = /** @class */ (function (_super) {
    __extends(NoExistUserError, _super);
    function NoExistUserError(userName) {
        var _this = _super.call(this, 'No existe el user con name' + userName) || this;
        _this.name = 'NoExistUserError';
        return _this;
    }
    return NoExistUserError;
}(Error));
exports.NoExistUserError = NoExistUserError;
var ExistsUserError = /** @class */ (function (_super) {
    __extends(ExistsUserError, _super);
    function ExistsUserError(userName) {
        var _this = _super.call(this, 'Ya existe el user con name' + userName) || this;
        _this.name = 'ExistsUserError';
        return _this;
    }
    return ExistsUserError;
}(Error));
exports.ExistsUserError = ExistsUserError;
