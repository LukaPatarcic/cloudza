import { TimestampEntity } from '@entity/timestamp.entity';
import { User } from '@feature/user/user.entity';

import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ForgottenPassword extends TimestampEntity {
    constructor(token, user) {
        super();
        this.token = token;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    salt: string;

    @Column({ default: false, type: 'boolean' })
    active: boolean;

    @OneToOne(() => User, (user) => user.forgottenPassword, { eager: true })
    @JoinColumn()
    user: User;
}
