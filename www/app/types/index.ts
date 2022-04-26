import { AlertColor } from '@mui/material';

export type htmlButtonTypes = 'button' | 'submit' | 'reset';
export interface Message {
    message: string;
    severity: AlertColor;
}
