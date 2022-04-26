import { fetchJson } from '@api/index';

export const getSetupIntentToken = (
    token: string
): Promise<{ clientSecret: string }> => {
    return fetchJson('/payments/secret', {}, token);
};

export const savePaymentMethod = (
    token: string,
    data: { paymentMethodId: string }
): Promise<void> => {
    return fetchJson(
        '/payments/method',
        { method: 'POST', body: JSON.stringify(data) },
        token
    );
};

export const deletePaymentMethod = (token: string): Promise<void> => {
    return fetchJson('/payments/method', { method: 'DELETE' }, token);
};
