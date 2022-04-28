import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { User } from '@feature/auth/entity/user.entity';
import { PaymentService } from '@feature/payment/payment.service';
import { RequestHistoryStatus } from '@feature/request-history/request-history-status.enum';
import { RequestHistoryService } from '@feature/request-history/request-history.service';

@Injectable()
export class WeatherService {
    public constructor(
        private readonly paymentService: PaymentService,
        private readonly requestHistoryService: RequestHistoryService,
    ) {}

    public async getWeather(ip: string, user: User) {
        const GET_WEATHER_API_ENDPOINT = '/weather';
        try {
            await this.paymentService.createUsageRecord(user);
            await this.requestHistoryService.saveRequestHistory(
                user,
                ip,
                GET_WEATHER_API_ENDPOINT,
                RequestHistoryStatus.SUCCESS,
            );

            return [{ weather: 'good' }, { weather: 'bad' }];
        } catch (err) {
            await this.requestHistoryService.saveRequestHistory(
                user,
                ip,
                GET_WEATHER_API_ENDPOINT,
                RequestHistoryStatus.ERROR,
            );
            throw new InternalServerErrorException();
        }
    }
}
