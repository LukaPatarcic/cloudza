import { fetchJson } from '@api/index';
import { Paginated } from '@type/api';
import { RequestHistory } from '@type/api/requestHistory';

export const getRequestHistory = (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: string,
    token: string
): Promise<Paginated<RequestHistory>> => {
    return fetchJson(
        `/request-history?page=${page}&limit=${rowsPerPage}&sortBy=${orderBy}:${order.toUpperCase()}`,
        {},
        token
    );
};

export const getRequestHistoryMothData = (token: string) => {
    return fetchJson(`/request-history/month`, {}, token);
};

export const getRequestHistoryMothCount = (token: string) => {
    return fetchJson(`/request-history/month/count`, {}, token);
};
