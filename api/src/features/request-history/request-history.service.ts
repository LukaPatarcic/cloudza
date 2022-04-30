import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@feature/auth/entity/user.entity';
import { RequestHistoryStatus } from '@feature/request-history/request-history-status.enum';
import { RequestHistory } from '@feature/request-history/request-history.entity';
import { RequestHistoryRepository } from '@feature/request-history/request-history.repository';

import {
    FilterOperator,
    paginate,
    Paginated,
    PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class RequestHistoryService {
    constructor(
        @InjectRepository(RequestHistoryRepository)
        private readonly requestHistoryRepository: RequestHistoryRepository,
    ) {}

    public findAll(
        query: PaginateQuery,
        user: User,
    ): Promise<Paginated<RequestHistory>> {
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

    public async getChartData(user: User) {
        return this.requestHistoryRepository.findChartData(user);
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
