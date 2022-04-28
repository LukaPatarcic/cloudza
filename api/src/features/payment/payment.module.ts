import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@feature/auth/auth.module';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { PaymentHistoryRepository } from '@feature/payment/payment-history.repository';
import { PaymentController } from '@feature/payment/payment.controller';
import { PaymentService } from '@feature/payment/payment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthRepository, PaymentHistoryRepository]),
        AuthModule,
        ConfigModule,
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService],
})
export class PaymentModule {}
