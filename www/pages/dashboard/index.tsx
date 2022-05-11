import * as React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { getSession } from 'next-auth/react';

import {
    getRequestHistoryMothCount,
    getRequestHistoryMothData,
} from '@api/requestHistory';
import DashboardLayout from '@layout/DashboardLayout';
import DashboardPage from '@template/DashboardPage';
import { DashboardProps } from '@type/components/DashboardProps';

const Dashboard: NextPage<DashboardProps> = ({ data, count }) => {
    return (
        <DashboardLayout selectedItem="Dashboard">
            <DashboardPage data={data} count={count} />
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    const [data, count] = await Promise.all([
        getRequestHistoryMothData(session!.accessToken!),
        getRequestHistoryMothCount(session!.accessToken!),
    ]);

    return {
        props: {
            session,
            data,
            count,
        },
    };
};

export default Dashboard;
