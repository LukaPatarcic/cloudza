"use strict";
exports.__esModule = true;
exports.mailerConfig = void 0;
var config_1 = require("@nestjs/config");
var handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
exports.mailerConfig = {
    imports: [config_1.ConfigModule],
    useFactory: function (configService) { return ({
        transport: "smtps://".concat(configService.get('SMTP_USERNAME'), ":").concat(configService.get('SMTP_PASSWORD'), "@").concat(configService.get('SMTP_DOMAIN')),
        defaults: {
            from: configService.get('SMTP_FROM')
        },
        template: {
            dir: __dirname + '/../../features/mail/templates',
            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
            options: {
                strict: true
            }
        }
    }); },
    inject: [config_1.ConfigService]
};
