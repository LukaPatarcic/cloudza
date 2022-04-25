import React from 'react';

import { TextFieldProps } from '@mui/material';
import {
    AuBankAccountElement,
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    FpxBankElement,
    IbanElement,
    IdealBankElement,
} from '@stripe/react-stripe-js';

export type StripeElement =
    | typeof AuBankAccountElement
    | typeof CardCvcElement
    | typeof CardExpiryElement
    | typeof CardNumberElement
    | typeof FpxBankElement
    | typeof IbanElement
    | typeof IdealBankElement;

export interface StripeTextFieldProps<T extends StripeElement>
    extends Omit<TextFieldProps, 'onChange' | 'inputComponent' | 'inputProps'> {
    inputProps?: React.ComponentProps<T>;
    labelErrorMessage: string | null;
    onChange?: React.ComponentProps<T>['onChange'];
    stripeElement?: T;
}
