import * as React from 'react';

import DashboardLayout from '@layout/DashboardLayout';
import DashboardPage from '@template/DashboardPage';

const Dashboard = () => {
    return (
        <DashboardLayout selectedItem="Dashboard">
            <DashboardPage />
        </DashboardLayout>
    );
};

export default Dashboard;
