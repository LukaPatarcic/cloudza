import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

import { SignInDto } from '@feature/auth/dto/sign-in.dto';
import { SignUpDto } from '@feature/auth/dto/sign-up.dto';
import { User } from '@feature/user/user.entity';
import { UserRepository } from '@feature/user/user.repository';

import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
    async validateUserPassword(signInDto: SignInDto): Promise<User> {
        const { email, password } = signInDto;
        const user = await this.findOne({ email });
        if (user && (await user.validatePassword(password))) {
            return user;
        }

        return null;
    }

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { email, name, password } = signUpDto;
        try {
            const { hashedPassword, salt } =
                await AuthRepository.generatePassword(password);
            const user = new User(email, name, hashedPassword, salt);
            await user.save();
            return user;
        } catch (error) {
            if (error.errno === 1062) {
                throw new ConflictException('Email already taken');
            }
            throw new InternalServerErrorException();
        }
    }

    async setPassword(email: string, newPassword: string): Promise<boolean> {
        const userRepository = this.manager.getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);
        const { hashedPassword, salt } = await AuthRepository.generatePassword(
            newPassword,
        );
        user.password = hashedPassword;
        user.salt = salt;

        await user.save();
        return true;
    }

    private static async generatePassword(password: string) {
        const salt: string = await bcrypt.genSalt();
        const hashedPassword: string = await bcrypt.hash(password, salt);
        return { salt, hashedPassword };
    }
}
