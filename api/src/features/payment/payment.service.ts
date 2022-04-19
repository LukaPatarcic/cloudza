import { Injectable } from '@nestjs/common';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}
    public async getSecret() {
        return this.stripeClient.paymentIntents.create({
            amount: 0,
            setup_future_usage: 'off_session',
            currency: 'eur',
        });
    }
}
