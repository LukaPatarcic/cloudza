import {
    BadRequestException,
    Headers,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@decorator/get-user.decorator';
import { User } from '@feature/auth/entity/user.entity';
import { PaymentService } from '@feature/payment/payment.service';

import { Paginate, PaginateQuery } from 'nestjs-paginate';
import Stripe from 'stripe';

import { RequestWithRawBody } from '../../core/interface/request-with-body.interface';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('/secret')
    @UseGuards(AuthGuard())
    public async getSecret(@GetUser() user: User) {
        const clientSecret = await this.paymentService.getSecret(
            user.customerId,
        );
        const hasPaymentMethod = !!user.paymentMethodId;
        return { clientSecret, hasPaymentMethod };
    }

    @Delete('/method')
    @UseGuards(AuthGuard())
    public async deletePaymentMethod(@GetUser() user: User) {
        try {
            return this.paymentService.deletePaymentMethod(user);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    @Get('/history')
    @UseGuards(AuthGuard())
    public async getPaymentHistory(
        @Paginate() query: PaginateQuery,
        @GetUser() user: User,
    ) {
        try {
            return this.paymentService.getPaymentHistory(query, user);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    @Post('/webhook')
    public async stripeWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() request: RequestWithRawBody,
    ) {
        if (!signature) {
            throw new BadRequestException('Missing stripe-signature header');
        }
        const event = await this.paymentService.constructEventFromPayload(
            signature,
            request.rawBody,
        );
        switch (event.type) {
            case 'setup_intent.succeeded': {
                const data = event.data.object as Stripe.SetupIntent;
                await this.paymentService.savePaymentMethod(data);
                break;
            }
            case 'payment_method.attached': {
                const data = event.data.object as Stripe.PaymentMethod;
                await this.paymentService.savePriceSubscription(data);
                break;
            }
            case 'invoice.paid': {
                const data = event.data.object as Stripe.Invoice;
                await this.paymentService.savePaymentHistory(data);
                break;
            }
            case 'invoice.payment_failed': {
                const data = event.data.object as Stripe.Invoice;
                await this.paymentService.savePaymentHistory(data);
                break;
            }
        }
    }
}
