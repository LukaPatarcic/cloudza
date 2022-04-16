import { Controller } from '@nestjs/common';

import { PaymentService } from '@feature/payment/payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly PaymentService: PaymentService) {}
}
