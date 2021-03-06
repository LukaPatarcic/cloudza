import * as React from 'react';
import { FC } from 'react';

import { APP_NAME } from '@constant/index';
import Paper from '@element/Paper/Paper';
import { Grid, Typography } from '@mui/material';
import {
    DashboardProps,
    RequestHistoryChart,
} from '@type/components/DashboardProps';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    PointElement,
    Legend,
} from 'chart.js';
import { useSession } from 'next-auth/react';
import { Line } from 'react-chartjs-2';
import NumberFormat from 'react-number-format';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Requests',
        },
    },
};

export const chartData = (data: RequestHistoryChart[]) => ({
    labels: data.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
        {
            data: data.map((item) => item.count),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
});

const DashboardPage: FC<DashboardProps> = ({ data, count }) => {
    const session = useSession();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h6">
                        Welcome back to {APP_NAME},{' '}
                        <Typography display="inline" variant="h6">
                            {session.data?.user?.name}
                        </Typography>
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper>
                    <Line options={options} data={chartData(data)} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper>
                    <Typography>
                        Your total requests this month are:{' '}
                        <Typography
                            display="inline"
                            sx={{ fontWeight: 'bold' }}
                        >
                            <NumberFormat
                                displayType="text"
                                value={count.count}
                            />
                        </Typography>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
