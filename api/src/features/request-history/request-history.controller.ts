import {
    Controller,
    Get,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@decorator/get-user.decorator';
import { User } from '@feature/auth/entity/user.entity';
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
    @UsePipes(new ValidationPipe())
    public async getRequestHistories(
        @Paginate() query: PaginateQuery,
        @GetUser() user: User,
    ): Promise<Paginated<RequestHistory>> {
        return this.requestHistoryService.findAll(query, user);
    }

    @Get('/month')
    public async getMonthData(@GetUser() user: User) {
        return this.requestHistoryService.getMonthData(user);
    }

    @Get('/month/count')
    public async getMonthDataCount(@GetUser() user: User) {
        const count = await this.requestHistoryService.getMonthDataCount(user);
        return { count };
    }
}
