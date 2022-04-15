import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from '@feature/auth/dto/auth-credentials.dto';
import { JwtPayload } from '@feature/auth/interface/jwt-payload.interface';
import { SiginResponse } from '@feature/auth/interface/sigin-response.interface';
import { UserRepository } from '@feature/auth/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<SiginResponse> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, ...payload };
  }
}
