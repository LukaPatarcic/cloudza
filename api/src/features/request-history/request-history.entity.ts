import { TimestampEntity } from '@entity/timestamp.entity';
import { User } from '@feature/auth/entity/user.entity';
import { RequestHistoryStatus } from '@feature/request-history/request-history-status.enum';

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequestHistory extends TimestampEntity {
    constructor(user: User, ip: string, status: RequestHistoryStatus) {
        super();
        this.user = user;
        this.ip = ip;
        this.status = status;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    ip: string;

    @Column()
    @IsNotEmpty()
    status: RequestHistoryStatus;

    @ManyToOne(() => User, (user) => user.requestHistories)
    user: User;
}
