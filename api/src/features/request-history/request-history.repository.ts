import { User } from '@feature/auth/entity/user.entity';
import {
    RequestHistoryChartGroupBy,
    RequestHistoryChartDto,
} from '@feature/request-history/request-history-chart.dto';
import { RequestHistory } from '@feature/request-history/request-history.entity';

import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(RequestHistory)
export class RequestHistoryRepository extends Repository<RequestHistory> {
    public async findChartData(params: RequestHistoryChartDto, user: User) {
        let query = this.baseFindChartData(params, user);
        query = RequestHistoryRepository.groupByQuery(query, params.groupBy);
        if (params.query) {
            query = query.where(
                `${params.groupBy.toUpperCase()}(created_at) = :date`,
                {
                    date: params.query,
                },
            );
        }

        return query
            .getRawMany<{ id: number; count: string; createdAt: string }>()
            .then((raw) =>
                raw.map((r) => ({ ...r, count: parseInt(r.count) })),
            );
    }

    private static groupByQuery(
        query: SelectQueryBuilder<RequestHistory>,
        groupBy: RequestHistoryChartGroupBy,
    ) {
        switch (groupBy) {
            case 'date':
                return query.groupBy('Date(created_at)');
            case 'month':
                return query.groupBy('Month(created_at)');
            case 'year':
                return query.groupBy('Year(created_at)');
            default:
                return query.groupBy('Year(created_at)');
        }
    }

    private baseFindChartData(params: RequestHistoryChartDto, user: User) {
        return this.createQueryBuilder()
            .select([
                'id',
                'COUNT(*) as count',
                `${params.groupBy.toUpperCase()}(created_at) as date`,
            ])
            .where('userId = :userId', { userId: user.id })
            .orderBy('created_at', 'ASC');
    }
}
