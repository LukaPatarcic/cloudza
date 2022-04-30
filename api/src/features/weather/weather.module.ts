import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@feature/auth/auth.module';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { PaymentModule } from '@feature/payment/payment.module';
import { RequestHistoryModule } from '@feature/request-history/request-history.module';

import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthRepository]),
        AuthModule,
        PaymentModule,
        RequestHistoryModule,
    ],
    controllers: [WeatherController],
    providers: [WeatherService],
})
export class WeatherModule {}
