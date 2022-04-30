import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@feature/auth/entity/user.entity';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { Token } from '@feature/token/token.entity';
import { TokenRepository } from '@feature/token/token.repository';

import { createHash, randomBytes } from 'crypto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class TokenService {
    public constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        @InjectRepository(TokenRepository)
        private readonly tokenRepository: TokenRepository,
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
    ) {}

    public async getToken(user: User) {
        const token = await this.tokenRepository.findOne({ where: { user } });
        return { token: token?.hiddenToken ?? null };
    }

    public async saveToken(user: User) {
        //TODO(Luka Patarcic) check if user has paid for feature
        const tokens = await this.generateToken();
        const tokenExists = await this.tokenRepository.findOne({
            where: { user },
        });

        if (tokenExists) {
            await this.updateToken(
                tokenExists,
                tokens.hashedAPIKey,
                TokenService.hideToken(tokens.apiKey),
                user,
            );
            return { token: tokens.apiKey };
        }

        const token = new Token(
            user,
            tokens.hashedAPIKey,
            TokenService.hideToken(tokens.apiKey),
        );
        user.token = token;
        await Promise.all([token.save(), user.save()]);

        return { token: tokens.apiKey };
    }

    public async deleteToken(user: User) {
        user.token = null;
        await user.save();
        return this.tokenRepository.delete({ user });
    }

    private async updateToken(
        token: Token,
        newToken: string,
        hiddenToken: string,
        user: User,
    ) {
        user.token = token;
        await user.save();
        return this.tokenRepository.update(token.id, {
            token: newToken,
            hiddenToken,
        });
    }

    public async checkIfTokenIsValid(token: string) {
        const hashedToken = createHash('sha256').update(token).digest('hex');
        const dbToken = await this.tokenRepository.findOne({
            where: { token: hashedToken },
        });
        if (!dbToken) return null;

        const isValid = dbToken.token === hashedToken;
        if (isValid) {
            return dbToken;
        }

        return null;
    }

    private async generateToken() {
        const tokens = TokenService.hashToken();

        const tempCheckIfHasToken = false;
        if (tempCheckIfHasToken) {
            await this.generateToken();
        } else {
            return tokens;
        }
    }

    private static hideToken(token: string) {
        return token.slice(0, -4).replace(/./g, '*') + token.slice(-4);
    }

    private static async hashToken() {
        const apiKey = randomBytes(16).toString('hex');
        const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');

        return { apiKey, hashedAPIKey };
    }
}
