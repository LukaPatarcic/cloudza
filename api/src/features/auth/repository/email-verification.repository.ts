import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { EmailVerification } from '@feature/auth/entity/email-verification.entity';
import { User } from '@feature/user/user.entity';
import { UserRepository } from '@feature/user/user.repository';
import { CommonHelper } from '@helper/common.helper';

import { randomBytes } from 'crypto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EmailVerification)
export class EmailVerificationRepository extends Repository<EmailVerification> {
    async findByToken(token: string) {
        const emailVerification = await this.findOne({
            token,
        });
        if (!emailVerification) {
            throw new HttpException(
                'LOGIN.EMAIL_CODE_NOT_VALID',
                HttpStatus.FORBIDDEN,
            );
        }
        return emailVerification;
    }

    async createEmailToken(email: string): Promise<User> {
        const userRepository = this.manager.getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);
        const emailVerification = await this.findOne({ user });
        if (
            CommonHelper.timeIsLessThan15Minutes(
                emailVerification?.updated_at.getTime(),
            )
        ) {
            throw new HttpException(
                'LOGIN.EMAIL_SENT_RECENTLY',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
        const token = await this.generateEmailToken();
        if (!emailVerification) {
            const newEmailVerification = new EmailVerification(token, user);
            await newEmailVerification.save();
            user.emailVerification = newEmailVerification;
            return user;
        }
        emailVerification.token = token;
        await emailVerification.save();
        return user;
    }

    private async generateEmailToken() {
        const token = CommonHelper.generateToken();
        const existsInDb = await this.findOne({ token });
        if (existsInDb) {
            this.generateEmailToken();
        }

        return token;
    }
}
