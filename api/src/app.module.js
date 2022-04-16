"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var stripe_config_1 = require("@config/stripe.config");
var typeorm_config_1 = require("@config/typeorm.config");
var auth_module_1 = require("@feature/auth/auth.module");
var auth_repository_1 = require("@feature/auth/repository/auth.repository");
var mail_module_1 = require("@feature/mail/mail.module");
var payment_module_1 = require("@feature/payment/payment.module");
var token_controller_1 = require("@feature/token/token.controller");
var token_module_1 = require("@feature/token/token.module");
var token_service_1 = require("@feature/token/token.service");
var mailer_1 = require("@nestjs-modules/mailer");
var nestjs_command_1 = require("nestjs-command");
var nestjs_stripe_1 = require("nestjs-stripe");
var trim_middleware_1 = require("./core/middleware/trim.middleware");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(trim_middleware_1.TrimMiddleware).forRoutes('*');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmConfig),
                nestjs_stripe_1.StripeModule.forRootAsync(stripe_config_1.stripeConfig),
                typeorm_1.TypeOrmModule.forFeature([auth_repository_1.AuthRepository]),
                nestjs_command_1.CommandModule,
                mailer_1.MailerModule,
                mail_module_1.MailModule,
                auth_module_1.AuthModule,
                payment_module_1.PaymentModule,
                token_module_1.TokenModule,
            ],
            providers: [token_service_1.TokenService],
            controllers: [token_controller_1.TokenController]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
