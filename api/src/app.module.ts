import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { stripeConfig } from '@config/stripe.config';
import { typeOrmConfig } from '@config/typeorm.config';
import { AuthModule } from '@feature/auth/auth.module';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { MailModule } from '@feature/mail/mail.module';
import { PaymentModule } from '@feature/payment/payment.module';
import { TokenController } from '@feature/token/token.controller';
import { TokenModule } from '@feature/token/token.module';
import { TokenService } from '@feature/token/token.service';
import { MailerModule } from '@nestjs-modules/mailer';

import { CommandModule } from 'nestjs-command';
import { StripeModule } from 'nestjs-stripe';

import { TrimMiddleware } from './core/middleware/trim.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        StripeModule.forRootAsync(stripeConfig),
        TypeOrmModule.forFeature([AuthRepository]),
        CommandModule,
        MailerModule,
        MailModule,
        AuthModule,
        PaymentModule,
        TokenModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TrimMiddleware).forRoutes('*');
    }
}
