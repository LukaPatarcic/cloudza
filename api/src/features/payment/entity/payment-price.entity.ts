import { TimestampEntity } from '@entity/timestamp.entity';
import { PaymentProduct } from '@feature/payment/entity/payment-product.entity';

import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentPrice extends TimestampEntity {
    constructor(stripePriceId: string, price: number, product: PaymentProduct) {
        super();
        this.stripePriceId = stripePriceId;
        this.price = price;
        this.product = product;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Exclude()
    stripePriceId: string;

    @Column()
    @IsNotEmpty()
    price: number;

    @ManyToOne(() => PaymentProduct, (payment) => payment.prices)
    @JoinColumn()
    product: PaymentProduct;
}
