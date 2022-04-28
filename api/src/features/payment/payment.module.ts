import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@feature/auth/auth.module';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { PaymentController } from '@feature/payment/payment.controller';
import { PaymentService } from '@feature/payment/payment.service';
import { PaymentHistoryRepository } from '@feature/payment/repository/payment-history.repository';
import { PaymentPriceRepository } from '@feature/payment/repository/payment-price.repository';
import { PaymentProductRepository } from '@feature/payment/repository/payment-product.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AuthRepository,
            PaymentHistoryRepository,
            PaymentProductRepository,
            PaymentPriceRepository,
        ]),
        AuthModule,
        ConfigModule,
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService],
})
export class PaymentModule {}
