import { TimestampEntity } from '@entity/timestamp.entity';
import { User } from '@feature/user/user.entity';

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
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
