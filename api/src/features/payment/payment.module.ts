import { Module } from '@nestjs/common';

import { PaymentController } from '@feature/payment/payment.controller';
import { PaymentService } from '@feature/payment/payment.service';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
