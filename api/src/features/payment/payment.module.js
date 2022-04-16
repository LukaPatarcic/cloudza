"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentModule = void 0;
var common_1 = require("@nestjs/common");
var payment_controller_1 = require("@feature/payment/payment.controller");
var payment_service_1 = require("@feature/payment/payment.service");
var PaymentModule = /** @class */ (function () {
    function PaymentModule() {
    }
    PaymentModule = __decorate([
        (0, common_1.Module)({
            providers: [payment_service_1.PaymentService],
            controllers: [payment_controller_1.PaymentController]
        })
    ], PaymentModule);
    return PaymentModule;
}());
exports.PaymentModule = PaymentModule;
