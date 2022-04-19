import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from '@feature/auth/interface/jwt-payload.interface';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { User } from '@feature/user/user.entity';

import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly userRepository: AuthRepository,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        console.log(payload);
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
