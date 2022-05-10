import * as React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { getSession } from 'next-auth/react';

import { getRequestHistoryChart } from '@api/requestHistory';
import DashboardLayout from '@layout/DashboardLayout';
import DashboardPage from '@template/DashboardPage';
import { DashboardProps } from '@type/components/DashboardProps';

const Dashboard: NextPage<DashboardProps> = ({ data }) => {
    return (
        <DashboardLayout selectedItem="Dashboard">
            <DashboardPage data={data} />
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    const data = await getRequestHistoryChart(session!.accessToken!);

    return {
        props: {
            session,
            data,
        },
    };
};

export default Dashboard;
