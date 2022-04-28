import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@feature/auth/entity/user.entity';
import { GetUser } from '@feature/auth/get-user.decorator';
import { RequestHistory } from '@feature/request-history/request-history.entity';
import { RequestHistoryService } from '@feature/request-history/request-history.service';

import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('request-history')
@UseGuards(AuthGuard())
export class RequestHistoryController {
    constructor(
        private readonly requestHistoryService: RequestHistoryService,
    ) {}

    @Get()
    public async getRequestHistories(
        @Paginate() query: PaginateQuery,
        @GetUser() user: User,
    ): Promise<Paginated<RequestHistory>> {
        return this.requestHistoryService.findAll(query, user);
    }
}