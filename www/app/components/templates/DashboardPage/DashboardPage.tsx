import * as React from 'react';

import Paper from '@element/Paper/Paper';
import Orders from '@module/Dashboard/Orders';
import { Grid } from '@mui/material';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

import { Line } from 'react-chartjs-2';

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

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const data = {
    labels,
    datasets: [
        {
            data: [279, -510, 918, 386, -980, -523, 248],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};
//TODO(Luka Patarcic) Show graph of usage, welcome screen, total uses this month, show when and if paid last invoice
const DashboardPage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <Line options={options} data={data} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
