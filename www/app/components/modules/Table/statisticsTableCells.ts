import { RequestHistory } from '@type/api/requestHistory';
import { HeadCell } from '@type/index';

export const statisticsTableCells: HeadCell<RequestHistory>[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: '#',
    },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
    { id: 'ip', numeric: false, disablePadding: true, label: 'IP Addresss' },
    {
        id: 'created_at',
        numeric: false,
        disablePadding: true,
        label: 'Created At',
    },
];
