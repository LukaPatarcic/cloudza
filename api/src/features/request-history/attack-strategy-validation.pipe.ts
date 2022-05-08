import { BadRequestException, PipeTransform } from '@nestjs/common';

import {
    RequestHistoryChartDto,
    RequestHistoryChartGroupBy,
} from '@feature/request-history/request-history-chart.dto';

export class RequestHistoryChartGroupByValidationPipe implements PipeTransform {
    readonly allowedGroupBys = [
        RequestHistoryChartGroupBy.YEAR,
        RequestHistoryChartGroupBy.MONTH,
        RequestHistoryChartGroupBy.DATE,
    ];

    transform(value: RequestHistoryChartDto) {
        if (!value.groupBy) return value;
        const groupBy =
            value.groupBy.toLowerCase() as RequestHistoryChartGroupBy;
        if (!this.isStatusValid(groupBy))
            throw new BadRequestException(
                `${groupBy} is an invalid group by type`,
            );

        return value;
    }

    private isStatusValid(status: RequestHistoryChartGroupBy) {
        console.log(status, this.allowedGroupBys.indexOf(status));
        const idx = this.allowedGroupBys.indexOf(status);
        return idx !== -1;
    }
}
