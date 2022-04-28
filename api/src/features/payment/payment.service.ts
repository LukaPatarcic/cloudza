import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@feature/auth/entity/user.entity';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { Price, Product } from '@feature/payment/product.interface';
import { PaymentHistoryRepository } from '@feature/payment/repository/payment-history.repository';
import { PaymentPriceRepository } from '@feature/payment/repository/payment-price.repository';
import { PaymentProductRepository } from '@feature/payment/repository/payment-product.repository';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

// TODO(Luka Patarcic) replace with database call
const ITEM_PRICE = 'price_1KooEPEjKEiPMUzsPKQSWF1R';

@Injectable()
export class PaymentService {
    public constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        private configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
        @InjectRepository(PaymentHistoryRepository)
        private readonly paymentHistoryRepository: PaymentHistoryRepository,
        @InjectRepository(PaymentProductRepository)
        private readonly paymentProductRepository: PaymentProductRepository,
        @InjectRepository(PaymentPriceRepository)
        private readonly paymentPriceRepository: PaymentPriceRepository,
    ) {}

    public async getSecret(customerId: string) {
        const setupIntent = await this.stripeClient.setupIntents.create({
            customer: customerId,
        });
        return setupIntent.client_secret;
    }

    public async savePaymentMethod(setupIntent: Stripe.SetupIntent) {
        const paymentMethodId = setupIntent.payment_method as string;
        const customerId = setupIntent.customer as string;
        const user = await this.authRepository.findByCustomerId(customerId);
        if (user.paymentMethodId) {
            await this.detachPaymentMethod(user.paymentMethodId);
        }
        user.paymentMethodId = paymentMethodId;
        // await this.attachPaymentMethod(paymentMethodId, user.customerId);
        const subscription = await this.addSubscription(user);
        user.subscriptionItemId = subscription.itemId;
        user.subscriptionId = subscription.id;
        await user.save();
    }

    public async savePriceSubscription(data: Stripe.PaymentMethod) {
        const { metadata, customer } = data;
        const priceId = metadata.price_id;
        const user = await this.authRepository.findByCustomerId(
            customer as string,
        );
        user.priceId = priceId;
        await user.save();
    }

    public async deletePaymentMethod(user: User) {
        await this.detachPaymentMethod(user.paymentMethodId);
        await this.removeSubscription(user);
        user.paymentMethodId = null;
        user.subscriptionId = null;
        user.subscriptionItemId = null;
        user.priceId = null;
        await user.save();
    }

    public async createUsageRecord(user: User) {
        return this.stripeClient.subscriptionItems.createUsageRecord(
            user.subscriptionItemId,
            {
                quantity: 1,
                timestamp: 'now',
                action: 'increment',
            },
        );
    }

    public async constructEventFromPayload(signature: string, payload: Buffer) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_KEY');

        return this.stripeClient.webhooks.constructEvent(
            payload,
            signature,
            webhookSecret,
        );
    }

    private async addSubscription(user: User) {
        if (user.subscriptionItemId) return;
        const subscription = await this.stripeClient.subscriptions.create({
            customer: user.customerId,
            items: [{ price: user.priceId }],
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

    public async getProducts() {
        const data: Product[] = [];
        const products = await this.stripeClient.products.list();
        for (const product of products.data) {
            const { id: productId, name, description, images } = product;
            const pricesList = await this.stripeClient.prices.list({
                product: product.id,
            });
            const singlePrice = pricesList.data[0];
            const price: Price = {
                id: singlePrice.id,
                unitAmount: singlePrice.unit_amount,
            };
            data.push({ id: productId, name, description, images, price });
        }

        return data;
    }
}
