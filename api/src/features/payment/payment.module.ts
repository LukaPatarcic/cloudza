import { Module } from '@nestjs/common';

import { AuthModule } from '@feature/auth/auth.module';
import { PaymentController } from '@feature/payment/payment.controller';
import { PaymentService } from '@feature/payment/payment.service';

@Module({
    imports: [AuthModule],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
