import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Token } from '@feature/token/token.entity';
import { TokenService } from '@feature/token/token.service';

import Strategy from 'passport-headerapikey';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
    Strategy,
    'x-api-key',
) {
    constructor(private readonly tokenService: TokenService) {
        super(
            { header: 'x-api-key', prefix: '' },
            true,
            async (
                apiKey: string,
                done: (error: Error, data: Token | null) => void,
            ) => {
                return this.validate(apiKey, done);
            },
        );
    }

    public async validate(
        token: string,
        done: (error: Error, data: Token | null) => void,
    ) {
        const dbToken = await this.tokenService.checkIfTokenIsValid(token);
        if (dbToken) {
            done(null, dbToken);
        }

        done(new UnauthorizedException(), null);
    }
}
