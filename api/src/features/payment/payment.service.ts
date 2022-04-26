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
        return { clientSecret: setupIntent.client_secret };
    }

    public async savePaymentMethod(user: User, paymentMethodId: string) {
        if (user.paymentMethodId) {
            await this.detachPaymentMethod(paymentMethodId);
        }
        user.paymentMethodId = paymentMethodId;
        await this.attachPaymentMethod(paymentMethodId, user.customerId);
        await user.save();

        return paymentMethodId;
    }

    public async deletePaymentMethod(user: User) {
        user.paymentMethodId = null;
        await this.detachPaymentMethod(user.paymentMethodId);
        await user.save();
    }

    private async attachPaymentMethod(
        paymentMethodId: string,
        customerId: string,
    ) {
        return await this.stripeClient.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
    }

    private async detachPaymentMethod(paymentMethodId: string) {
        return await this.stripeClient.paymentMethods.detach(paymentMethodId);
    }
}
