"use strict";
exports.__esModule = true;
exports.CommonHelper = void 0;
var crypto_1 = require("crypto");
var CommonHelper = /** @class */ (function () {
    function CommonHelper() {
    }
    CommonHelper.timeIsLessThan15Minutes = function (time) {
        // 15-minute difference
        if (!time)
            return false;
        return (new Date().getTime() - time) / 60000 < 15;
    };
    CommonHelper.generateToken = function () {
        return (0, crypto_1.randomBytes)(48).toString('hex');
    };
    return CommonHelper;
}());
exports.CommonHelper = CommonHelper;
