export interface DashboardProps {
    data: RequestHistoryChart[];
    count: RequestHistoryCount;
}

export interface RequestHistoryCount {
    count: number;
}

export interface RequestHistoryChart {
    id: number;
    count: number;
    date: string;
}
