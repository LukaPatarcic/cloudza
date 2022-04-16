"use strict";
// success: true => message, data
// success: false => errorMessage, error
exports.__esModule = true;
exports.ResponseSuccess = exports.ResponseError = void 0;
var ResponseError = /** @class */ (function () {
    function ResponseError(infoMessage, data) {
        this.success = false;
        this.message = infoMessage;
        this.data = data;
        console.warn(new Date().toString() +
            ' - [Response]: ' +
            infoMessage +
            (data ? ' - ' + JSON.stringify(data) : ''));
    }
    return ResponseError;
}());
exports.ResponseError = ResponseError;
var ResponseSuccess = /** @class */ (function () {
    function ResponseSuccess(infoMessage, data, notLog) {
        this.success = true;
        this.message = infoMessage;
        this.data = data;
        if (!notLog) {
            try {
                var obfuscateRequest = JSON.parse(JSON.stringify(data));
                if (obfuscateRequest && obfuscateRequest.token)
                    obfuscateRequest.token = '*******';
                console.log(new Date().toString() +
                    ' - [Response]: ' +
                    JSON.stringify(obfuscateRequest));
            }
            catch (error) {
                //empty
            }
        }
    }
    return ResponseSuccess;
}());
exports.ResponseSuccess = ResponseSuccess;
