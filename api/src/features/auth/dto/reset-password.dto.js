"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResetPasswordDto = void 0;
var is_equal_decorator_1 = require("@decorator/is-equal.decorator");
var class_validator_1 = require("class-validator");
var ResetPasswordDto = /** @class */ (function () {
    function ResetPasswordDto() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], ResetPasswordDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)()
    ], ResetPasswordDto.prototype, "newPasswordToken");
    __decorate([
        (0, class_validator_1.IsString)()
    ], ResetPasswordDto.prototype, "currentPassword");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'Password is too weak'
        })
    ], ResetPasswordDto.prototype, "newPassword");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, is_equal_decorator_1.IsEqualTo)('newPassword', { message: 'Passwords do not match' })
    ], ResetPasswordDto.prototype, "passwordConfirm");
    return ResetPasswordDto;
}());
exports.ResetPasswordDto = ResetPasswordDto;
