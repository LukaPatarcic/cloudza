import { TimestampEntity } from '@entity/timestamp.entity';
import { User } from '@feature/auth/entity/user.entity';

import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EmailVerification extends TimestampEntity {
    constructor(token, user) {
        super();
        this.token = token;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    token: string;

    @OneToOne(() => User, (user) => user.emailVerification, { eager: true })
    @JoinColumn()
    user: User;
}
