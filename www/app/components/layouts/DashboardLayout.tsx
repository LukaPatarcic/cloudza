import { FC, ReactNode } from 'react';

import DashboardContent from '@module/Dashboard/Dashboard';

interface Props {
    children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
    return <DashboardContent>{children}</DashboardContent>;
};

export default DashboardLayout;
