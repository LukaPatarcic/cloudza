import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { getStripe } from '@helper/stripe';

const stripePromise = getStripe();

import useResponsiveFontSize from '@hook/useResponsiveFontSize';

import { useMemo } from 'react';

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
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
        });
        console.log('[PaymentMethod]', payload);
    };
    console.log(elements, stripe);
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card number
                <CardNumberElement
                    options={options}
                    onReady={() => {
                        console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event) => {
                        console.log('CardNumberElement [change]', event);
                    }}
                    onBlur={() => {
                        console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                        console.log('CardNumberElement [focus]');
                    }}
                />
            </label>
            <label>
                Expiration date
                <CardExpiryElement
                    options={options}
                    onReady={() => {
                        console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event) => {
                        console.log('CardNumberElement [change]', event);
                    }}
                    onBlur={() => {
                        console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                        console.log('CardNumberElement [focus]');
                    }}
                />
            </label>
            <label>
                CVC
                <CardCvcElement
                    options={options}
                    onReady={() => {
                        console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event) => {
                        console.log('CardNumberElement [change]', event);
                    }}
                    onBlur={() => {
                        console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                        console.log('CardNumberElement [focus]');
                    }}
                />
            </label>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

const StripeCheckout = () => {
    stripePromise.then(console.log);
    return (
        <Elements stripe={stripePromise}>
            <StripeCheckoutForm />
        </Elements>
    );
};

export default StripeCheckout;
