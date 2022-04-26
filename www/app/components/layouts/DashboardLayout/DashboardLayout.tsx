import { FC, ReactNode } from 'react';

import DashboardContent from '@module/Dashboard/Dashboard';

interface Props {
    children: ReactNode;
    selectedItem: string;
}

const DashboardLayout: FC<Props> = ({ children, selectedItem }) => {
    return (
        <DashboardContent selectedItem={selectedItem}>
            {children}
        </DashboardContent>
    );
};

export default DashboardLayout;
