import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { AuthCredentialsDto } from '@feature/auth/dto/auth-credentials.dto';
import { User } from '@feature/auth/user.entity';

import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await this.hashPassword(password, salt);
      const user = new User(email, hashedPassword, salt);
      await user.save();
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Username already exists');
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
