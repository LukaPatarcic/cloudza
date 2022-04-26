import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@feature/auth/entity/user.entity';
import { GetUser } from '@feature/auth/get-user.decorator';
import { PaymentService } from '@feature/payment/payment.service';

@Controller('payments')
@UseGuards(AuthGuard())
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('/secret')
    public async getSecret(@GetUser() user: User) {
        const clientSecret = await this.paymentService.getSecret(
            user.customerId,
        );
        const hasPaymentMethod = !!user.paymentMethodId;
        return { clientSecret, hasPaymentMethod };
    }

    @Post('/method')
    public async savePaymentMethod(
        @GetUser() user: User,
        @Body() data: { paymentMethodId: string },
    ) {
        try {
            return this.paymentService.savePaymentMethod(
                user,
                data.paymentMethodId,
            );
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    @Delete('/method')
    public async deletePaymentMethod(@GetUser() user: User) {
        try {
            return this.paymentService.deletePaymentMethod(user);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}
