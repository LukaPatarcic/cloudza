import { loadStripe } from '@stripe/stripe-js';

import type { Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
    if (!stripePromise) {
        if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
            throw new Error('Missing Stripe Publishable Key');
        }
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        );
    }
    return stripePromise;
};
