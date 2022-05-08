import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { PaymentService } from '@feature/payment/payment.service';
import { RequestHistoryStatus } from '@feature/request-history/request-history-status.enum';
import { RequestHistoryService } from '@feature/request-history/request-history.service';
import { Token } from '@feature/token/token.entity';

@Injectable()
export class WeatherService {
    public constructor(
        private readonly paymentService: PaymentService,
        private readonly requestHistoryService: RequestHistoryService,
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
    ) {}

    public async getWeather(token: Token, ip: string) {
        const GET_WEATHER_API_ENDPOINT = '/weather';
        const user = await this.authRepository.findByToken(token);
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
