import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';

import {
    DASHBOARD_CHECKOUT_ROUTE,
    DASHBOARD_INTEGRATION_ROUTE,
    DASHBOARD_ROUTE,
    DASHBOARD_STATISTICS_ROUTE,
} from '@constant/routes';
import { Item } from '@type/components/ListItemProps';

export const mainListItems: Item[] = [
    { href: DASHBOARD_ROUTE, icon: <DashboardIcon />, title: 'Dashboard' },
    {
        href: DASHBOARD_CHECKOUT_ROUTE,
        icon: <AttachMoneyIcon />,
        title: 'Payments',
    },
    {
        href: DASHBOARD_STATISTICS_ROUTE,
        icon: <BarChartIcon />,
        title: 'Statistics',
    },
    {
        href: DASHBOARD_INTEGRATION_ROUTE,
        icon: <LayersIcon />,
        title: 'Integrations',
    },
];

export const secondaryListItems: Item[] = [
    { href: '#', icon: <SettingsIcon />, title: 'Settings' },
];
