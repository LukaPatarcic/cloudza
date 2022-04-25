import React from 'react';

import { CardNumberElement } from '@stripe/react-stripe-js';

import { StripeTextField } from '@module/Stripe/StripeTextField';
import { StripeTextFieldProps } from '@type/components/StripeProps';

export function StripeTextFieldNumber(
    props: StripeTextFieldProps<typeof CardNumberElement>
) {
    return (
        <StripeTextField
            label="Credit Card Number"
            stripeElement={CardNumberElement}
            {...props}
        />
    );
}
