import { Injectable } from '@nestjs/common';

import { createHash, randomBytes } from 'crypto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class TokenService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}
    public async test() {
        const session = await this.stripeClient.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_1KooEPEjKEiPMUzsPKQSWF1R',
                },
            ],
            success_url:
                'http://YOUR-WEBSITE/dashboard?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://YOUR-WEBSITE/error',
        });
        return session;
    }

    public async saveToken() {
        //check if user has paid for feature
        //generate token for user
        const token = this.generateToken();
        //save data
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
