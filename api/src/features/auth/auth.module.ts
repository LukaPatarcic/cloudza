import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '@feature/auth/auth.controller';
import { AuthService } from '@feature/auth/auth.service';
import { JwtStrategy } from '@feature/auth/jwt.strategy';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { EmailVerificationRepository } from '@feature/auth/repository/email-verification.repository';
import { ForgottenPasswordRepository } from '@feature/auth/repository/forgotten-password.repository';
import { UserRepository } from '@feature/user/user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: parseInt(configService.get('JWT_EXPIRES_IN')),
                },
            }),
        }),
        TypeOrmModule.forFeature([
            AuthRepository,
            UserRepository,
            EmailVerificationRepository,
            ForgottenPasswordRepository,
        ]),
        ConfigModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
