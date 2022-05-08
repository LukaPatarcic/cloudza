import { PaymentHistory } from '@type/api/paymentHistory';
import { HeadCell } from '@type/index';

export const paymentsTableCells: HeadCell<PaymentHistory>[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: '#',
    },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
    {
        id: 'amountDue',
        numeric: false,
        disablePadding: true,
        label: 'Amount Due',
    },
    {
        id: 'amountPaid',
        numeric: false,
        disablePadding: true,
        label: 'Amount Paid',
    },
    { id: 'currency', numeric: false, disablePadding: true, label: 'Currency' },
    {
        id: 'invoiceDownloadUrl',
        numeric: false,
        disablePadding: true,
        label: 'Invoice',
    },
    {
        id: 'created_at',
        numeric: false,
        disablePadding: true,
        label: 'Created At',
    },
];
