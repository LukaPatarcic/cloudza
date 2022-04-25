import * as React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getToken } from 'next-auth/jwt';

import { getSetupIntentToken } from '@api/payment';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import StripeCheckout from '@module/Stripe/StripeCheckout';
import { CheckoutProps } from '@type/components/CheckoutProps';

const Checkout: NextPage<CheckoutProps> = ({ clientSecret }) => {
    return (
        <DashboardLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <StripeCheckout clientSecret={clientSecret} />
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = await getToken(ctx);
    const accessToken = (token?.accessToken as string) ?? '';
    const clientSecret = await getSetupIntentToken(accessToken);
    return {
        props: { clientSecret: clientSecret.clientSecret },
    };
};

export default Checkout;
