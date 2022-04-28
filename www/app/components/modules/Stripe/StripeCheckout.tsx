import { FC } from 'react';

import { Elements } from '@stripe/react-stripe-js';

import getStripe from '@helper/getStripe';
import StripeCheckoutForm from '@module/Stripe/StripeCheckoutForm';
import { CheckoutProps } from '@type/components/CheckoutProps';

const stripePromise = getStripe();

const StripeCheckout: FC<CheckoutProps> = ({
    products,
    clientSecret,
    hasPaymentMethod,
}) => {
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm
                products={products}
                clientSecret={clientSecret}
                hasPaymentMethod={hasPaymentMethod}
            />
        </Elements>
    );
};

export default StripeCheckout;
