import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { stripeConfig } from '@config/stripe.config';
import { typeOrmConfig } from '@config/typeorm.config';
import { AuthModule } from '@feature/auth/auth.module';
import { UserRepository } from '@feature/auth/user.repository';
import { TokenController } from '@feature/token/token.controller';
import { TokenModule } from '@feature/token/token.module';
import { TokenService } from '@feature/token/token.service';

import { CommandModule } from 'nestjs-command';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    CommandModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ConfigModule.forRoot(),
    StripeModule.forRootAsync(stripeConfig),
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    TokenModule,
  ],
  providers: [TokenService],
  controllers: [TokenController],
})
export class AppModule {}
