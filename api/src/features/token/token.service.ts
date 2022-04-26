import { Injectable } from '@nestjs/common';

import { createHash, randomBytes } from 'crypto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class TokenService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    public async saveToken() {
        //check if user has paid for feature
        //generate token for user
        const token = this.generateToken();
        //save data
        return { token };
    }

    // Recursive function to generate a unique random string as API key
    private generateToken() {
        const tokens = TokenService.hashToken();

        // Ensure API key is unique
        const tempCheckIfHasToken = true;
        if (tempCheckIfHasToken) {
            this.generateToken();
        } else {
            return tokens;
        }
    }

    private static hashToken() {
        const apiKey = randomBytes(16).toString('hex');

        const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');

        return { apiKey, hashedAPIKey };
    }
}
