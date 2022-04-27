import { TimestampEntity } from '@entity/timestamp.entity';
import { User } from '@feature/auth/entity/user.entity';

import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['token'])
export class Token extends TimestampEntity {
    constructor(user: User, token: string) {
        super();
        this.user = user;
        this.token = token;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
