import { PaymentPrice } from '@feature/payment/entity/payment-price.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PaymentPrice)
export class PaymentPriceRepository extends Repository<PaymentPrice> {}
