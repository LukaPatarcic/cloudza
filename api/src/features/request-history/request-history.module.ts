import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@feature/auth/auth.module';
import { RequestHistoryRepository } from '@feature/request-history/request-history.repository';

import { RequestHistoryController } from './request-history.controller';
import { RequestHistoryService } from './request-history.service';

@Module({
    imports: [TypeOrmModule.forFeature([RequestHistoryRepository]), AuthModule],
    controllers: [RequestHistoryController],
    providers: [RequestHistoryService],
    exports: [RequestHistoryService],
})
export class RequestHistoryModule {}
