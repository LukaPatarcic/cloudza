import { DASHBOARD_CHECKOUT_ROUTE, LOGIN_ROUTE } from '@constant/routes';

export const pricingList = [
    {
        title: 'Free Trial',
        subheader: '',
        price: '0',
        description: [
            'Personal API token',
            '1000 requests per day',
            'All features available',
            'Excellent documentation',
            '1 month free',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
        href: LOGIN_ROUTE,
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '0.2',
        description: [
            'Personal API token',
            '10000 requests per day',
            'All features available',
            'Excellent documentation',
            '24/7 uptime',
        ],
        buttonText: 'Subscribe now',
        buttonVariant: 'contained',
        href: DASHBOARD_CHECKOUT_ROUTE,
    },
    {
        title: 'Standard',
        subheader: '',
        price: '0.1',
        description: [
            'Personal API token',
            '5000 requests per day',
            'All features available',
            'Excellent documentation',
            '24/7 uptime',
        ],
        buttonText: 'Subscribe now',
        buttonVariant: 'outlined',
        href: DASHBOARD_CHECKOUT_ROUTE,
    },
];
