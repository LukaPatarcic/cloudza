import React from 'react';

import { Paginated } from '@type/api';
import { RequestHistory } from '@type/api/requestHistory';
import { Order } from '@type/index';

export interface StatisticsProps {
    status: 'idle' | 'error' | 'loading' | 'success';
    data?: Paginated<RequestHistory>;
    order: Order;
    orderBy: keyof RequestHistory;
    rowsPerPage: number;
    page: number;
    handleRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof RequestHistory
    ) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}
