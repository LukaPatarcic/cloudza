"use strict";
exports.__esModule = true;
exports.stripeConfig = void 0;
var config_1 = require("@nestjs/config");
exports.stripeConfig = {
    imports: [config_1.ConfigModule],
    useFactory: function (configService) { return ({
        apiKey: configService.get('STRIPE_API_KEY'),
        apiVersion: '2020-08-27'
    }); },
    inject: [config_1.ConfigService]
};
