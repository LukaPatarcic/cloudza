import {
    Controller,
    Get,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@decorator/get-user.decorator';
import { User } from '@feature/auth/entity/user.entity';
import { RequestHistoryChartGroupByValidationPipe } from '@feature/request-history/attack-strategy-validation.pipe';
import { RequestHistoryChartDto } from '@feature/request-history/request-history-chart.dto';
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

    @Get('/chart')
    @UsePipes(
        new ValidationPipe({ transform: true, whitelist: true }),
        RequestHistoryChartGroupByValidationPipe,
    )
    public async getChartData(
        @Query() params: RequestHistoryChartDto,
        @GetUser() user: User,
    ) {
        return this.requestHistoryService.getChartData(params, user);
    }

    @Get('/today')
    public async getTodayData(@GetUser() user: User) {
        const count = await this.requestHistoryService.getTodayData(user);
        return { count };
    }
}
