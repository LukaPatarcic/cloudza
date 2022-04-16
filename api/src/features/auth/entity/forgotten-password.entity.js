"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ForgottenPassword = void 0;
var user_entity_1 = require("@feature/user/user.entity");
var typeorm_1 = require("typeorm");
var timestamp_entity_1 = require("../../../core/entity/timestamp.entity");
var ForgottenPassword = /** @class */ (function (_super) {
    __extends(ForgottenPassword, _super);
    function ForgottenPassword(token, user) {
        var _this = _super.call(this) || this;
        _this.token = token;
        _this.user = user;
        return _this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ForgottenPassword.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], ForgottenPassword.prototype, "token");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }, function (user) { return user.forgottenPassword; }, { eager: true }),
        (0, typeorm_1.JoinColumn)()
    ], ForgottenPassword.prototype, "user");
    ForgottenPassword = __decorate([
        (0, typeorm_1.Entity)()
    ], ForgottenPassword);
    return ForgottenPassword;
}(timestamp_entity_1.TimestampEntity));
exports.ForgottenPassword = ForgottenPassword;
