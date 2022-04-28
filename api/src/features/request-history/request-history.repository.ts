import { RequestHistory } from '@feature/request-history/request-history.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RequestHistory)
export class RequestHistoryRepository extends Repository<RequestHistory> {}
