import { AlertColor } from '@mui/material';

export type htmlButtonTypes = 'button' | 'submit' | 'reset';
export interface Message {
    message: string;
    severity: AlertColor;
}

export type Order = 'asc' | 'desc';

export interface HeadCell<T> {
    disablePadding: boolean;
    id: keyof T;
    label: string;
    numeric: boolean;
}
