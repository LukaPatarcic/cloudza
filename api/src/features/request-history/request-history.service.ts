import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@feature/auth/entity/user.entity';
import { RequestHistoryStatus } from '@feature/request-history/request-history-status.enum';
import { RequestHistory } from '@feature/request-history/request-history.entity';
import { RequestHistoryRepository } from '@feature/request-history/request-history.repository';

import { Cache } from 'cache-manager';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class RequestHistoryService {
    constructor(
        @InjectRepository(RequestHistoryRepository)
        private readonly requestHistoryRepository: RequestHistoryRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    public findAll(query: PaginateQuery, user: User) {
        return paginate(query, this.requestHistoryRepository, {
            sortableColumns: ['id', 'status', 'ip', 'created_at'],
            searchableColumns: ['status', 'ip', 'created_at'],
            defaultSortBy: [['id', 'DESC']],
            where: { user },
            filterableColumns: {
                created_at: [FilterOperator.GTE, FilterOperator.LTE],
            },
        });
    }

    public async getMonthData(user: User) {
        const key = `${user.id}-request-history-month`;
        const data = await this.cacheManager.get(key);
        if (data) return data;
        const dataFromDb = await this.requestHistoryRepository.findChartData(
            user,
        );
        await this.cacheManager.set(key, dataFromDb, { ttl: 3600 });
        return dataFromDb;
    }

    public async getMonthDataCount(user: User) {
        const key = `${user.id}-request-history-month-count`;
        const count = await this.cacheManager.get(key);
        if (count) return count;
        const countFromDb =
            await this.requestHistoryRepository.findThisMonthData(user);
        await this.cacheManager.set(key, countFromDb, { ttl: 3600 });
        return countFromDb;
    }

    public async saveRequestHistory(
        user: User,
        ip: string,
        request: string,
        status: RequestHistoryStatus,
    ) {
        const requestHistory = new RequestHistory(user, ip, request, status);
        await requestHistory.save();

        return requestHistory;
    }
}
