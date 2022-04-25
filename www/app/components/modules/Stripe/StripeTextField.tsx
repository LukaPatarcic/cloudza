import React from 'react';

import { TextField } from '@mui/material';

import { StripeInput } from '@module/Stripe/StripeInput';
import {
    StripeElement,
    StripeTextFieldProps,
} from '@type/components/StripeProps';

export const StripeTextField = <T extends StripeElement>(
    props: StripeTextFieldProps<T>
) => {
    const {
        helperText,
        InputLabelProps,
        InputProps = {},
        inputProps,
        error,
        labelErrorMessage,
        stripeElement,
        ...other
    } = props;

    return (
        <TextField
            fullWidth
            InputLabelProps={{
                ...InputLabelProps,
                shrink: true,
            }}
            error={error}
            InputProps={{
                ...InputProps,
                inputProps: {
                    ...inputProps,
                    ...InputProps.inputProps,
                    component: stripeElement,
                },
                inputComponent: StripeInput,
            }}
            helperText={error ? labelErrorMessage : helperText}
            {...(other as any)}
        />
    );
};
