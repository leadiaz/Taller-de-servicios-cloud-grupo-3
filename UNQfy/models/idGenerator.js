'use strict';
exports.__esModule = true;
const IdGenerator = /** @class */ (function () {
    function IdGenerator() {
    }
    IdGenerator.getNextId = function () {
        this.id++;
        return this.id - 1;
    };
    IdGenerator.id = 1;
    return IdGenerator;
}());
exports.IdGenerator = IdGenerator;
