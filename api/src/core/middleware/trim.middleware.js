"use strict";
exports.__esModule = true;
exports.TrimMiddleware = void 0;
var TrimMiddleware = /** @class */ (function () {
    function TrimMiddleware() {
    }
    TrimMiddleware.prototype.use = function (req, _res, next) {
        var requestBody = req === null || req === void 0 ? void 0 : req.body;
        if (TrimMiddleware.isObj(requestBody)) {
            req.body = this.trim(requestBody);
        }
        next();
    };
    TrimMiddleware.isObj = function (obj) {
        return typeof obj === 'object' && obj !== null;
    };
    TrimMiddleware.prototype.trim = function (value) {
        var _this = this;
        if (typeof value === 'string') {
            return value.trim();
        }
        if (Array.isArray(value)) {
            value.forEach(function (element, index) {
                value[index] = _this.trim(element);
            });
            return value;
        }
        if (TrimMiddleware.isObj(value)) {
            Object.keys(value).forEach(function (key) {
                value[key] = _this.trim(value[key]);
            });
            return value;
        }
        return value;
    };
    return TrimMiddleware;
}());
exports.TrimMiddleware = TrimMiddleware;
