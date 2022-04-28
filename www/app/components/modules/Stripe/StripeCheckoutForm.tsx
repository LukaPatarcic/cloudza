import { FC, FormEvent, useState } from 'react';
import * as React from 'react';

import { Alert, Grid, Paper, TextField } from '@mui/material';
import {
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import SubmitButton from '@element/SubmitButton/SubmitButton';
import RemoveCard from '@module/Stripe/RemoveCard';
import StripeProducts from '@module/Stripe/StripeProducts';
import { StripeTextFieldCVC } from '@module/Stripe/StripeTextFieldCVC';
import { StripeTextFieldExpiry } from '@module/Stripe/StripeTextFieldExpiry';
import { StripeTextFieldNumber } from '@module/Stripe/StripeTextFieldNumber';
import { CheckoutProps } from '@type/components/CheckoutProps';
import { StripeCardState } from '@type/components/StripeCardState';
import { Message } from '@type/index';

const StripeCheckoutForm: FC<CheckoutProps> = ({
    products,
    clientSecret,
    hasPaymentMethod,
}) => {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(hasPaymentMethod);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [message, setMessage] = useState<Message>({
        message: '',
        severity: 'success',
    });
    const [state, setState] = useState<StripeCardState>({
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !stripe ||
            !elements ||
            !selectedPrice ||
            cardNumberError ||
            expiredError ||
            cvcError ||
            cardNameError
        )
            return;
        const card = elements.getElement(CardNumberElement);
        if (!card) return;
        try {
            setIsLoading(true);
            const setup = await stripe.confirmCardSetup(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name,
                    },
                    metadata: {
                        price_id: selectedPrice,
                    },
                },
            });

            if (setup.error?.message) {
                setMessage({
                    message: setup.error.message,
                    severity: 'error',
                });
                return;
            }

            setMessage({
                message: 'Successfully added card',
                severity: 'success',
            });
            setPaymentMethod(true);
        } catch (err) {
            setMessage({
                message: 'Something went wrong...',
                severity: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onElementChange =
        (field: string, errorField: string): any =>
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
        <>
            <StripeProducts
                products={products}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
            />
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <RemoveCard
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                        <Grid item xs={12} md={12}>
                            <TextField
                                value={name}
                                label="Name"
                                placeholder="John Doe"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                autoComplete="off"
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
                                onChange={onElementChange(
                                    'cvcComplete',
                                    'cvcError'
                                )}
                            />
                        </Grid>
                        {message.message && (
                            <Grid item xs={12}>
                                <Alert severity={message.severity}>
                                    {message.message}
                                </Alert>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <SubmitButton
                                isLoading={isLoading}
                                disabled={!stripe}
                            >
                                Pay
                            </SubmitButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );
};

export default StripeCheckoutForm;
