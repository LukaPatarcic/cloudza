import { Module } from '@nestjs/common';

import { AuthModule } from '@feature/auth/auth.module';
import { PaymentModule } from '@feature/payment/payment.module';
import { RequestHistoryModule } from '@feature/request-history/request-history.module';

import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
    imports: [AuthModule, PaymentModule, RequestHistoryModule],
    controllers: [WeatherController],
    providers: [WeatherService],
})
export class WeatherModule {}
