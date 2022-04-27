import { Injectable } from '@nestjs/common';

import { User } from '@feature/auth/entity/user.entity';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class WeatherService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    public async getWeather(user: User) {
        await this.stripeClient.subscriptionItems.createUsageRecord(
            user.subscriptionItemId,
            {
                quantity: 1,
                timestamp: 'now',
                action: 'increment',
            },
        );
        return [{ weather: 'good' }, { weather: 'bad' }];
    }
}
