import { FC } from 'react';

import { Elements } from '@stripe/react-stripe-js';

import getStripe from '@helper/getStripe';
import StripeCheckoutForm from '@module/Stripe/StripeCheckoutForm';
import { CheckoutProps } from '@type/components/CheckoutProps';

const stripePromise = getStripe();

const StripeCheckout: FC<CheckoutProps> = ({ clientSecret }) => {
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm clientSecret={clientSecret} />
        </Elements>
    );
};

export default StripeCheckout;
