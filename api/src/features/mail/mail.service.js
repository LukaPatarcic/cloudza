"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MailService = void 0;
var common_1 = require("@nestjs/common");
var MailService = /** @class */ (function () {
    function MailService(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
        this.apiUrl = this.configService.get('API_HOSTNAME');
        this.wwwUrl = this.configService.get('WWW_HOSTNAME');
    }
    MailService.prototype.sendVerificationEmail = function (email, name, token) {
        var url = "".concat(this.apiUrl, "/auth/verify/").concat(token);
        return this.sendEmail(email, 'Verify Your Email Address', 'email-verification', {
            name: name,
            url: url
        });
    };
    MailService.prototype.sendPasswordResetEmail = function (email, name, token) {
        var url = "".concat(this.wwwUrl, "/password-reset?token=").concat(token, "$email=").concat(email);
        return this.sendEmail(email, 'Password Reset Request', 'forgotten-password', {
            name: name,
            url: url
        });
    };
    MailService.prototype.sendEmail = function (email, subject, template, context) {
        var mailTo = this.configService.get('SMTP_TO');
        return this.mailerService.sendMail({
            to: mailTo !== null && mailTo !== void 0 ? mailTo : email,
            subject: subject,
            template: template,
            context: context
        });
    };
    MailService = __decorate([
        (0, common_1.Injectable)()
    ], MailService);
    return MailService;
}());
exports.MailService = MailService;
