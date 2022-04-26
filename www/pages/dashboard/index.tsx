import * as React from 'react';

import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import DashboardPage from '@template/DashboardPage/DashboardPage';

const Dashboard = () => {
    return (
        <DashboardLayout selectedItem="Dashboard">
            <DashboardPage />
        </DashboardLayout>
    );
};

export default Dashboard;
