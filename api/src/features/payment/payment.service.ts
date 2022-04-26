import { Injectable } from '@nestjs/common';

import { User } from '@feature/auth/entity/user.entity';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    public async getSecret(customerId: string) {
        const setupIntent = await this.stripeClient.setupIntents.create({
            customer: customerId,
        });
        return setupIntent.client_secret;
    }

    public async savePaymentMethod(user: User, paymentMethodId: string) {
        if (user.paymentMethodId) {
            await this.detachPaymentMethod(user.paymentMethodId);
        }
        user.paymentMethodId = paymentMethodId;
        await this.attachPaymentMethod(paymentMethodId, user.customerId);
        await user.save();
    }

    public async deletePaymentMethod(user: User) {
        await this.detachPaymentMethod(user.paymentMethodId);
        user.paymentMethodId = null;
        await user.save();
    }

    private async attachPaymentMethod(
        paymentMethodId: string,
        customerId: string,
    ) {
        return this.stripeClient.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
    }

    private async detachPaymentMethod(paymentMethodId: string) {
        return this.stripeClient.paymentMethods.detach(paymentMethodId);
    }
}
