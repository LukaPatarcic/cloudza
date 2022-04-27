import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@feature/auth/entity/user.entity';
import { Token } from '@feature/token/token.entity';
import { TokenRepository } from '@feature/token/token.repository';

import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class TokenService {
    public constructor(
        @InjectStripe() private readonly stripeClient: Stripe,
        @InjectRepository(TokenRepository)
        private readonly tokenRepository: TokenRepository,
    ) {}

    public async saveToken(user: User) {
        //check if user has paid for feature
        const tokens = await this.generateToken();
        const tokenExists = await this.tokenRepository.findOne({
            where: { user },
        });

        if (tokenExists) {
            await this.updateToken(tokenExists.id, tokens.encryptedAPIKey);
            return { token: tokens.hashedAPIKey };
        }

        const token = new Token(user, tokens.encryptedAPIKey);
        await token.save();

        return { token: tokens.hashedAPIKey };
    }

    public async deleteToken(user: User) {
        return this.tokenRepository.delete({ user });
    }

    private async updateToken(id: number, token: string) {
        return this.tokenRepository.update(id, { token });
    }

    private generateToken() {
        const tokens = TokenService.hashToken();

        const tempCheckIfHasToken = false;
        if (tempCheckIfHasToken) {
            this.generateToken();
        } else {
            return tokens;
        }
    }

    private static async hashToken() {
        const apiKey = randomBytes(16).toString('hex');
        const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');

        const encryptedAPIKey = await bcrypt.hash(hashedAPIKey, 0);

        return { hashedAPIKey, encryptedAPIKey };
    }
}
