import { TimestampEntity } from '@entity/timestamp.entity';
import { User } from '@feature/auth/entity/user.entity';

import { Exclude } from 'class-transformer';
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
    constructor(user: User, token: string, hiddenToken: string) {
        super();
        this.user = user;
        this.token = token;
        this.hiddenToken = hiddenToken;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Exclude()
    token: string;

    @Column()
    hiddenToken: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
