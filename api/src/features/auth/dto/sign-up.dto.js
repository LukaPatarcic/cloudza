"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUpDto = void 0;
var is_equal_decorator_1 = require("@decorator/is-equal.decorator");
var class_validator_1 = require("class-validator");
var SignUpDto = /** @class */ (function () {
    function SignUpDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(40),
        (0, class_validator_1.MinLength)(2)
    ], SignUpDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsEmail)()
    ], SignUpDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'Password is too weak'
        })
    ], SignUpDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, is_equal_decorator_1.IsEqualTo)('password', { message: 'Passwords do not match' })
    ], SignUpDto.prototype, "passwordConfirm");
    return SignUpDto;
}());
exports.SignUpDto = SignUpDto;
