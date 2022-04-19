import { fetchJson } from '@api/index';

export const getPaymentIntentToken = (token: string) => {
    return fetchJson('/payments/paymentIntent', {}, token);
};
