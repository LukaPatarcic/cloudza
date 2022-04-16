import { User } from '@feature/user/user.entity';

import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { TimestampEntity } from '../../../core/entity/timestamp.entity';

@Entity()
export class EmailVerification extends TimestampEntity {
    constructor(token, user) {
        super();
        this.token = token;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => User, (user) => user.emailVerification, { eager: true })
    @JoinColumn()
    user: User;
}
