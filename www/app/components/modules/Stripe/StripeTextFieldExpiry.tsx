import React from 'react';

import { CardExpiryElement } from '@stripe/react-stripe-js';

import { StripeTextField } from '@module/Stripe/StripeTextField';
import { StripeTextFieldProps } from '@type/components/StripeProps';

export function StripeTextFieldExpiry(
    props: StripeTextFieldProps<typeof CardExpiryElement>
) {
    return (
        <StripeTextField
            label="Expires"
            stripeElement={CardExpiryElement}
            {...props}
        />
    );
}
