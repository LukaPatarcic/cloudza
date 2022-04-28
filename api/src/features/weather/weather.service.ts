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
        try {
            await this.paymentService.createUsageRecord(user);
            await this.requestHistoryService.saveRequestHistory(
                user,
                ip,
                RequestHistoryStatus.SUCCESS,
            );

            return [{ weather: 'good' }, { weather: 'bad' }];
        } catch (err) {
            await this.requestHistoryService.saveRequestHistory(
                user,
                ip,
                RequestHistoryStatus.ERROR,
            );
            throw new InternalServerErrorException();
        }
    }
}
