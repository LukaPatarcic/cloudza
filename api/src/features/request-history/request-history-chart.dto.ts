import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export enum RequestHistoryChartGroupBy {
    YEAR = 'year',
    MONTH = 'month',
    DATE = 'date',
}

export class RequestHistoryChartDto {
    @ApiProperty({ default: RequestHistoryChartGroupBy.YEAR })
    @IsString()
    groupBy: RequestHistoryChartGroupBy;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    query: number;
}
