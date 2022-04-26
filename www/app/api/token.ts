import { fetchJson } from '@api/index';

export const saveToken = (token: string): Promise<{ token: string }> => {
    return fetchJson('/tokens', {}, token);
};
