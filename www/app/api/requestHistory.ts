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
