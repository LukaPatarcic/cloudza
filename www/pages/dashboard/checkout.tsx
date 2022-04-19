import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import DashboardLayout from '@layout/DashboardLayout';
import StripeCheckout from '@module/Stripe/StripeCheckout';

const Checkout = () => {
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

export default Checkout;
