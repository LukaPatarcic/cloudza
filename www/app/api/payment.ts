import { fetchJson } from '@api/index';
export const getSetupIntentToken = (
    token: string
): Promise<{ clientSecret: string }> => {
    return fetchJson('/payments/secret', {}, token);
};
