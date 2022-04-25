import * as React from 'react';

import { GetServerSideProps } from 'next';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getToken } from 'next-auth/jwt';

import { getPaymentIntentToken } from '@api/payment';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import StripeCheckout from '@module/Stripe/StripeCheckout';

const Checkout = ({ paymentIntentToken }) => {
    console.log(paymentIntentToken);
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
                        <StripeCheckout />
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = await getToken(ctx);
    const accessToken = (token?.accessToken as string) ?? '';
    const paymentIntentToken = await getPaymentIntentToken(accessToken);
    return {
        props: { paymentIntentToken },
    };
};

export default Checkout;
