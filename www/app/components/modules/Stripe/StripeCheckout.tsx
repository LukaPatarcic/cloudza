import { Elements } from '@stripe/react-stripe-js';

import getStripe from '@helper/getStripe';
import StripeCheckoutForm from '@module/Stripe/StripeCheckoutForm';

const stripePromise = getStripe();

const StripeCheckout = () => {
    return (
        <Elements stripe={stripePromise}>
            <StripeCheckoutForm />
        </Elements>
    );
};

export default StripeCheckout;
