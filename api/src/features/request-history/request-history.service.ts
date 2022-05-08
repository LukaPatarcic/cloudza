import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@feature/auth/entity/user.entity';
import { RequestHistoryChartDto } from '@feature/request-history/request-history-chart.dto';
import { RequestHistoryStatus } from '@feature/request-history/request-history-status.enum';
import { RequestHistory } from '@feature/request-history/request-history.entity';
import { RequestHistoryRepository } from '@feature/request-history/request-history.repository';

import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class RequestHistoryService {
    constructor(
        @InjectRepository(RequestHistoryRepository)
        private readonly requestHistoryRepository: RequestHistoryRepository,
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

    public async getChartData(params: RequestHistoryChartDto, user: User) {
        return this.requestHistoryRepository.findChartData(params, user);
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
