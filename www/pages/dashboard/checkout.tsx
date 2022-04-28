import * as React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

import { getSetupIntentToken } from '@api/payment';
import { getProducts } from '@api/product';
import DashboardLayout from '@layout/DashboardLayout';
import CheckoutPage from '@template/CheckoutPage';
import { CheckoutProps } from '@type/components/CheckoutProps';

const Checkout: NextPage<CheckoutProps> = ({
    clientSecret,
    hasPaymentMethod,
    products,
}) => {
    return (
        <DashboardLayout selectedItem="Checkout">
            <CheckoutPage
                products={products}
                clientSecret={clientSecret}
                hasPaymentMethod={hasPaymentMethod}
            />
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const [token, session] = await Promise.all([
        getToken(ctx),
        getSession(ctx),
    ]);
    const accessToken = (token?.accessToken as string) ?? '';
    const [data, products] = await Promise.all([
        getSetupIntentToken(accessToken),
        getProducts(accessToken),
    ]);

    return {
        props: {
            clientSecret: data.clientSecret,
            hasPaymentMethod: data.hasPaymentMethod,
            products,
            session,
        },
    };
};

export default Checkout;
