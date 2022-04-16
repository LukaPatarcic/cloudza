"use strict";
exports.__esModule = true;
exports.typeOrmConfig = void 0;
var config_1 = require("@nestjs/config");
exports.typeOrmConfig = {
    imports: [config_1.ConfigModule],
    useFactory: function (configService) { return ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../../**/*.entity.*'],
        synchronize: true
    }); },
    inject: [config_1.ConfigService]
};
