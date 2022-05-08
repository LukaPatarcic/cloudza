import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {
    DASHBOARD_CHECKOUT_ROUTE,
    DASHBOARD_DOCS_WEATHER_ROUTE,
    DASHBOARD_INTEGRATION_ROUTE,
    DASHBOARD_PAYMENTS_ROUTE,
    DASHBOARD_ROUTE,
    DASHBOARD_STATISTICS_ROUTE,
} from '@constant/routes';
import { Item } from '@type/components/ListItemProps';

export const mainListItems: Item[] = [
    { href: DASHBOARD_ROUTE, icon: <DashboardIcon />, title: 'Dashboard' },
    {
        href: DASHBOARD_CHECKOUT_ROUTE,
        icon: <ShoppingCartIcon />,
        title: 'Checkout',
    },
    {
        href: DASHBOARD_STATISTICS_ROUTE,
        icon: <BarChartIcon />,
        title: 'Statistics',
    },
    {
        href: DASHBOARD_PAYMENTS_ROUTE,
        icon: <AttachMoneyIcon />,
        title: 'Payments',
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

export const docsListItems: Item[] = [
    {
        href: DASHBOARD_DOCS_WEATHER_ROUTE,
        icon: <CodeIcon />,
        title: 'Weather',
    },
];
