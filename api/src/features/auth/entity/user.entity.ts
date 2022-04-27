import { TimestampEntity } from '@entity/timestamp.entity';
import { EmailVerification } from '@feature/auth/entity/email-verification.entity';
import { ForgottenPassword } from '@feature/auth/entity/forgotten-password.entity';
import { Token } from '@feature/token/token.entity';

import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
    JoinColumn,
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends TimestampEntity {
    constructor(email, name, password, salt) {
        super();
        this.email = email;
        this.name = name;
        this.password = password;
        this.salt = salt;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column({
        nullable: true,
        unique: true,
    })
    @Exclude()
    customerId: string;

    @Column({
        nullable: true,
        unique: true,
    })
    @Exclude()
    paymentMethodId: string;

    @Column({
        nullable: true,
        unique: true,
    })
    @Exclude()
    subscriptionItemId: string;

    @Column({
        nullable: true,
        unique: true,
    })
    @Exclude()
    subscriptionId: string;

    @Column({ default: false, type: 'boolean' })
    @Exclude()
    isEmailVerified: boolean;

    @OneToOne(() => EmailVerification)
    @JoinColumn()
    emailVerification: EmailVerification;

    @OneToOne(() => ForgottenPassword)
    @JoinColumn()
    forgottenPassword: ForgottenPassword;

    @OneToOne(() => Token)
    @JoinColumn()
    token: Token;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
