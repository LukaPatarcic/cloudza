import { PaymentHistory } from '@feature/payment/payment-history.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PaymentHistory)
export class PaymentHistoryRepository extends Repository<PaymentHistory> {}
