import { PaymentProduct } from '@feature/payment/entity/payment-product.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PaymentProduct)
export class PaymentProductRepository extends Repository<PaymentProduct> {}
