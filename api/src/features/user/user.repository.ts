import { HttpException, HttpStatus } from '@nestjs/common';

import { User } from '@feature/user/user.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findByEmail(email: string) {
        const user = await this.findOne({ email });
        if (!user)
            throw new HttpException(
                'LOGIN.USER_NOT_FOUND',
                HttpStatus.NOT_FOUND,
            );

        return user;
    }
}
