import { User } from '@feature/auth/entity/user.entity';
import { RequestHistory } from '@feature/request-history/request-history.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RequestHistory)
export class RequestHistoryRepository extends Repository<RequestHistory> {
    public async findChartData(user: User) {
        return this.createQueryBuilder()
            .select([
                'id',
                'COUNT(*) as count',
                'Date(created_at) as createdAt',
            ])
            .where('userId = :userId', { userId: user.id })
            .groupBy('Date(created_at)')
            .orderBy('created_at', 'ASC')
            .getRawMany<{ id: number; count: string; createdAt: string }>()
            .then((raw) =>
                raw.map((r) => ({ ...r, count: parseInt(r.count) })),
            );
    }
}
