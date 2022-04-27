import { Injectable } from '@nestjs/common';

import { User } from '@feature/auth/entity/user.entity';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

// TODO(Luka Patarcic) replace with database call
const ITEM_PRICE = 'price_1KooEPEjKEiPMUzsPKQSWF1R';

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
        const subscription = await this.addSubscription(user);
        user.subscriptionItemId = subscription.itemId;
        user.subscriptionId = subscription.id;
        await user.save();
    }

    public async deletePaymentMethod(user: User) {
        await this.detachPaymentMethod(user.paymentMethodId);
        await this.removeSubscription(user);
        user.paymentMethodId = null;
        user.subscriptionId = null;
        user.subscriptionItemId = null;
        await user.save();
    }

    private async addSubscription(user: User) {
        if (user.subscriptionItemId) return;
        const subscription = await this.stripeClient.subscriptions.create({
            customer: user.customerId,
            items: [{ price: ITEM_PRICE }],
        });

        return { id: subscription.id, itemId: subscription.items.data[0].id };
    }

    private removeSubscription(user: User) {
        return this.stripeClient.subscriptions.del(user.subscriptionId);
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
