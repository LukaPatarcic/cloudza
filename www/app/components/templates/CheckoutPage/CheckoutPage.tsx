import * as React from 'react';
import { FC } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import StripeCheckout from '@module/Stripe/StripeCheckout';
import { CheckoutProps } from '@type/components/CheckoutProps';

const CheckoutPage: FC<CheckoutProps> = ({
    clientSecret,
    hasPaymentMethod,
}) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <StripeCheckout
                        clientSecret={clientSecret}
                        hasPaymentMethod={hasPaymentMethod}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CheckoutPage;
