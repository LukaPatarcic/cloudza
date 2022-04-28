import { TimestampEntity } from '@entity/timestamp.entity';
import { PaymentPrice } from '@feature/payment/entity/payment-price.entity';

import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentProduct extends TimestampEntity {
    constructor(
        stripeProductId: string,
        name: string,
        description: string,
        images: string[],
    ) {
        super();
        this.stripeProductId = stripeProductId;
        this.name = name;
        this.description = description;
        this.images = images;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Exclude()
    stripeProductId: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column('simple-array')
    @IsNotEmpty()
    images: string[];

    @OneToMany(() => PaymentPrice, (payment) => payment.product)
    @JoinColumn()
    prices: PaymentPrice[];
}
