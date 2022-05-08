import { ChangeEvent, FC, FormEvent, useState } from 'react';
import * as React from 'react';

import Link from 'next/link';

import { Alert, Grid, TextField, Typography } from '@mui/material';
import {
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';

import { DASHBOARD_SETTINGS_ROUTE } from '@constant/routes';
import Paper from '@element/Paper';
import SubmitButton from '@element/SubmitButton';
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
    const [selectedPrice, setSelectedPrice] = useState(
        products[products.length - 1].price.id
    );
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
        if (!name) {
            setState((state) => ({
                ...state,
                cardNameError: !name ? 'Please enter your name' : '',
            }));
        }
        if (
            !stripe ||
            !elements ||
            !name ||
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
        } catch (err) {
            setMessage({
                message: 'Something went wrong...',
                severity: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        setState((state) => ({
            ...state,
            cardNameComplete: !!value,
            cardNameError: !value ? 'Please enter your name' : '',
        }));
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
            <Paper>
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
                                autoComplete="off"
                                onChange={onNameChange}
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
                        {hasPaymentMethod && (
                            <Grid item xs={12}>
                                <Typography>
                                    *You have already setup your prefered plan
                                    and credit card. If you wish to change your
                                    card or plan you can do that here. If you
                                    wish to remove your card on unsubscibe go to{' '}
                                    <Link href={DASHBOARD_SETTINGS_ROUTE}>
                                        settings
                                    </Link>
                                </Typography>
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
