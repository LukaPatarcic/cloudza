import { fetchJson } from '@api/index';
import { Paginated } from '@type/api';
import { RequestHistory } from '@type/api/requestHistory';

export const getRequestHistory = (
    token: string
): Promise<Paginated<RequestHistory>> => {
    return fetchJson('/request-history', {}, token);
};
