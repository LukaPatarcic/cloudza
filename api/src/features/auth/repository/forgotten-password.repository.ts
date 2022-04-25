import { HttpException, HttpStatus } from '@nestjs/common';

import { ForgottenPassword } from '@feature/auth/entity/forgotten-password.entity';
import { User } from '@feature/auth/entity/user.entity';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { CommonHelper } from '@helper/common.helper';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ForgottenPassword)
export class ForgottenPasswordRepository extends Repository<ForgottenPassword> {
    async findByToken(token: string) {
        const forgottenPassword = await this.findOne({
            token,
        });
        if (!forgottenPassword) {
            throw new HttpException(
                'LOGIN.PASSWORD_CODE_NOT_VALID',
                HttpStatus.FORBIDDEN,
            );
        }
        return forgottenPassword;
    }

    async createForgottenPasswordToken(email: string): Promise<User> {
        const authRepository = this.manager.getCustomRepository(AuthRepository);
        const user = await authRepository.findByEmail(email);
        const forgottenPassword = await this.findOne({ user });

        if (
            CommonHelper.timeIsLessThan15Minutes(
                forgottenPassword?.updated_at.getTime(),
            )
        ) {
            throw new HttpException(
                'LOGIN.EMAIL_SENT_RECENTLY',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
        const token = await this.generatePasswordToken();
        if (!forgottenPassword) {
            const newForgottenPassword = new ForgottenPassword(token, user);
            await newForgottenPassword.save();
            user.forgottenPassword = newForgottenPassword;
            return user;
        }
        forgottenPassword.token = token;
        await forgottenPassword.save();
        return user;
    }

    private async generatePasswordToken() {
        const token = CommonHelper.generateToken();
        const existsInDb = await this.findOne({ token });
        if (existsInDb) {
            await this.generatePasswordToken();
        }

        return token;
    }
}
