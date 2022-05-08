import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@feature/auth/entity/user.entity';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { MailService } from '@feature/mail/mail.service';
import { PaymentHistory } from '@feature/payment/payment-history.entity';
import { PaymentHistoryRepository } from '@feature/payment/payment-history.repository';

import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    public constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        private configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
        @InjectRepository(PaymentHistoryRepository)
        private readonly paymentHistoryRepository: PaymentHistoryRepository,
        private readonly mailService: MailService,
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
        await this.attachPaymentMethod(paymentMethodId, user.customerId);
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

    public async savePaymentHistory(data: Stripe.Invoice) {
        const {
            id,
            hosted_invoice_url,
            status,
            amount_due,
            amount_paid,
            amount_remaining,
            currency,
            customer,
        } = data;
        const user = await this.authRepository.findByCustomerId(
            customer as string,
        );
        user.amount = amount_remaining;

        const paymentHistory = new PaymentHistory(
            id,
            amount_due,
            amount_paid,
            currency,
            hosted_invoice_url,
            status,
            user,
        );

        await Promise.all([paymentHistory.save(), user.save()]);
        if (status === 'open') {
            await this.mailService.sendFailInvoice(
                user.email,
                user.name,
                hosted_invoice_url,
            );
        } else {
            await this.mailService.sendSuccessInvoice(
                user.email,
                user.name,
                hosted_invoice_url,
            );
        }
    }

    public async getPaymentHistory(query: PaginateQuery, user: User) {
        return paginate(query, this.paymentHistoryRepository, {
            sortableColumns: ['id', 'status', 'created_at'],
            searchableColumns: ['status', 'created_at'],
            defaultSortBy: [['id', 'DESC']],
            where: { user },
            filterableColumns: {
                created_at: [FilterOperator.GTE, FilterOperator.LTE],
            },
        });
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
        return await this.stripeClient.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });
    }

    private async detachPaymentMethod(paymentMethodId: string) {
        return this.stripeClient.paymentMethods.detach(paymentMethodId);
    }
}
