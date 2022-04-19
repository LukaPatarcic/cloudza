import { useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import useResponsiveFontSize from '@hook/useResponsiveFontSize';

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: '#424770',
                    letterSpacing: '0.025em',
                    fontFamily: 'Source Code Pro, monospace',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
            },
        }),
        [fontSize]
    );

    return options;
};

const StripeCheckoutForm = () => {
    const [name, setName] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        const card = elements.getElement(CardNumberElement);
        if (!card) return;

        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name,
            },
        });

        console.log('[PaymentMethod]', payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card number
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <label>
                Card number
                <CardNumberElement options={options} />
            </label>
            <label>
                Expiration date
                <CardExpiryElement options={options} />
            </label>
            <label>
                CVC
                <CardCvcElement options={options} />
            </label>
            <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                fullWidth
                type="submit"
                disabled={!stripe}
            >
                Pay
            </Button>
        </form>
    );
};

export default StripeCheckoutForm;
