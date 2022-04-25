import { FC, useState } from 'react';

import { Grid, TextField } from '@mui/material';
import {
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import SubmitButton from '@element/SubmitButton/SubmitButton';
import { StripeTextFieldCVC } from '@module/Stripe/StripeTextFieldCVC';
import { StripeTextFieldExpiry } from '@module/Stripe/StripeTextFieldExpiry';
import { StripeTextFieldNumber } from '@module/Stripe/StripeTextFieldNumber';
import { CheckoutProps } from '@type/components/CheckoutProps';

const StripeCheckoutForm: FC<CheckoutProps> = ({ clientSecret }) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState<{
        cardNameComplete: boolean;
        cardNumberComplete: boolean;
        expiredComplete: boolean;
        cvcComplete: boolean;
        cardNameError: string | null;
        cardNumberError: string | null;
        expiredError: string | null;
        cvcError: string | null;
    }>({
        cardNumberComplete: false,
        cardNameComplete: false,
        expiredComplete: false,
        cvcComplete: false,
        cardNumberError: null,
        cardNameError: null,
        expiredError: null,
        cvcError: null,
    });
    const stripe = useStripe();
    const elements = useElements();
    const { cardNumberError, expiredError, cvcError, cardNameError } = state;

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        const card = elements.getElement(CardNumberElement);
        if (!card) return;
        setIsLoading(true);
        const result = await stripe.confirmCardSetup(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name,
                },
            },
        });
        setIsLoading(false);

        console.log('[PaymentMethod]', result);
    };

    const onElementChange =
        (field: string, errorField: string) =>
        ({
            complete,
            error = { message: null },
        }: {
            complete: boolean;
            error: { message: string | null };
        }) => {
            setState({
                ...state,
                [field]: complete,
                [errorField]: error.message,
            });
        };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField
                        value={name}
                        label="Name"
                        placeholder="John Doe"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        error={!!cardNameError}
                        helperText={cardNameError}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <StripeTextFieldNumber
                        error={Boolean(cardNumberError)}
                        labelErrorMessage={cardNumberError}
                        onChange={onElementChange(
                            'cardNumberComplete',
                            'cardNumberError'
                        )}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <StripeTextFieldExpiry
                        error={Boolean(expiredError)}
                        labelErrorMessage={expiredError}
                        onChange={onElementChange(
                            'expiredComplete',
                            'expiredError'
                        )}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <StripeTextFieldCVC
                        error={Boolean(cvcError)}
                        labelErrorMessage={cvcError}
                        onChange={onElementChange('cvcComplete', 'cvcError')}
                    />
                </Grid>
            </Grid>
            <SubmitButton
                isLoading={isLoading}
                sx={{ marginTop: 2 }}
                variant="contained"
                fullWidth
                type="submit"
                disabled={!stripe}
            >
                Pay
            </SubmitButton>
        </form>
    );
};

export default StripeCheckoutForm;
