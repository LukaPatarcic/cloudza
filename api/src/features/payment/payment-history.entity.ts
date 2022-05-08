import { TimestampEntity } from '@entity/timestamp.entity';
import { User } from '@feature/auth/entity/user.entity';

import { IsNotEmpty } from 'class-validator';
import Stripe from 'stripe';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentHistory extends TimestampEntity {
    constructor(
        invoiceId: string,
        amountDue: number,
        amountPaid: number,
        currency: string,
        invoiceDownloadUrl: string,
        status: Stripe.Invoice.Status,
        user: User,
    ) {
        super();
        this.user = user;
        this.status = status;
        this.amountDue = amountDue;
        this.amountPaid = amountPaid;
        this.currency = currency;
        this.invoiceId = invoiceId;
        this.invoiceDownloadUrl = invoiceDownloadUrl;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    amountDue: number;

    @Column()
    @IsNotEmpty()
    amountPaid: number;

    @Column()
    @IsNotEmpty()
    currency: string;

    @Column()
    @IsNotEmpty()
    invoiceId: string;

    @Column()
    @IsNotEmpty()
    invoiceDownloadUrl: string;

    @Column()
    @IsNotEmpty()
    status: Stripe.Invoice.Status;

    @ManyToOne(() => User, (user) => user.paymentHistories)
    user: User;
}
