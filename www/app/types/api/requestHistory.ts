export interface RequestHistory {
    id: number;
    ip: string;
    status: RequestHistoryStatus;
    created_at: string;
    updated_at: string;
}

export enum RequestHistoryStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}
