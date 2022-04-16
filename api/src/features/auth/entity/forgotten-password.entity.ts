import { User } from '@feature/user/user.entity';

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { TimestampEntity } from '../../../core/entity/timestamp.entity';

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
