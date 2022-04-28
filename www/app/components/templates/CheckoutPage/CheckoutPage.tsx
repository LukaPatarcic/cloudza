import * as React from 'react';
import { FC } from 'react';

import Grid from '@mui/material/Grid';

import StripeCheckout from '@module/Stripe/StripeCheckout';
import { CheckoutProps } from '@type/components/CheckoutProps';

const CheckoutPage: FC<CheckoutProps> = ({
    products,
    clientSecret,
    hasPaymentMethod,
}) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <StripeCheckout
                    products={products}
                    clientSecret={clientSecret}
                    hasPaymentMethod={hasPaymentMethod}
                />
            </Grid>
        </Grid>
    );
};

export default CheckoutPage;
