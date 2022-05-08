import React from 'react';

import { Paginated } from '@type/api';
import { PaymentHistory } from '@type/api/paymentHistory';
import { Order } from '@type/index';

export interface PaymentsProps {
    status: 'idle' | 'error' | 'loading' | 'success';
    data?: Paginated<PaymentHistory>;
    order: Order;
    orderBy: keyof PaymentHistory;
    rowsPerPage: number;
    page: number;
    handleRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof PaymentHistory
    ) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}
