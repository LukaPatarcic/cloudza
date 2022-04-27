import { fetchJson } from '@api/index';

export const saveToken = (token: string): Promise<{ token: string }> => {
    return fetchJson('/tokens', { method: 'POST' }, token);
};

export const deleteToken = (token: string): Promise<{ token: string }> => {
    return fetchJson('/tokens', { method: 'DELETE' }, token);
};
