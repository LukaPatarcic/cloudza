import React from 'react';

import { CardCvcElement } from '@stripe/react-stripe-js';

import { StripeTextField } from '@module/Stripe/StripeTextField';
import { StripeTextFieldProps } from '@type/components/StripeProps';

export function StripeTextFieldCVC(
    props: StripeTextFieldProps<typeof CardCvcElement>
) {
    return (
        <StripeTextField
            label="CVC Code"
            stripeElement={CardCvcElement}
            {...props}
        />
    );
}
