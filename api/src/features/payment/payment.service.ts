import { Injectable } from '@nestjs/common';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    public async getSecret(stripeCustomerId: string) {
        const setupIntent = await this.stripeClient.setupIntents.create({
            customer: stripeCustomerId,
        });
        return { clientSecret: setupIntent.client_secret };
    }
}
