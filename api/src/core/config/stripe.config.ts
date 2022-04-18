import { ConfigModule, ConfigService } from '@nestjs/config';

import { StripeAsyncOptions } from 'nestjs-stripe';

export const stripeConfig: StripeAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_API_KEY'),
        apiVersion: '2020-08-27',
    }),
    inject: [ConfigService],
};
