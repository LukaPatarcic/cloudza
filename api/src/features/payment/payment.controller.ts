import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PaymentService } from '@feature/payment/payment.service';

@Controller('payments')
@UseGuards(AuthGuard())
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('/paymentIntent')
    public async getSecret() {
        return this.paymentService.getSecret();
    }
}
