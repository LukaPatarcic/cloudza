import { fetchJson } from '@api/index';
import { Paginated } from '@type/api';
import { PaymentHistory } from '@type/api/paymentHistory';

export const getPaymentHistory = (
    page: number,
    rowsPerPage: number,
    orderBy: string,
    order: string,
    token: string
): Promise<Paginated<PaymentHistory>> => {
    return fetchJson(
        `/payments/history?page=${page}&limit=${rowsPerPage}&sortBy=${orderBy}:${order.toUpperCase()}`,
        {},
        token
    );
};
