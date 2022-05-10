export interface DashboardProps {
    data: RequestHistoryChart[];
}

export interface RequestHistoryChart {
    id: number;
    count: number;
    date: string;
}
