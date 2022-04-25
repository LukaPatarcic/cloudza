import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@feature/auth/entity/user.entity';
import { GetUser } from '@feature/auth/get-user.decorator';
import { PaymentService } from '@feature/payment/payment.service';

@Controller('payments')
@UseGuards(AuthGuard())
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('/paymentIntent')
    public async getSecret(@GetUser() user: User) {
        return this.paymentService.getSecret(user.stripeCustomerId);
    }
}
