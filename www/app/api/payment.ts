import { fetchJson } from '@api/index';

export const getSetupIntentToken = (
    token: string
): Promise<{ clientSecret: string; hasPaymentMethod: boolean }> => {
    return fetchJson('/payments/secret', {}, token);
};

export const deletePaymentMethod = (token: string): Promise<void> => {
    return fetchJson('/payments/method', { method: 'DELETE' }, token);
};
