import * as React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

import { getProducts, getSetupIntentToken } from '@api/payment';
import DashboardLayout from '@layout/DashboardLayout/DashboardLayout';
import CheckoutPage from '@template/CheckoutPage/CheckoutPage';
import { CheckoutProps } from '@type/components/CheckoutProps';

const Checkout: NextPage<CheckoutProps> = ({
    clientSecret,
    hasPaymentMethod,
    products,
}) => {
    return (
        <DashboardLayout selectedItem="Payments">
            <CheckoutPage
                products={products}
                clientSecret={clientSecret}
                hasPaymentMethod={hasPaymentMethod}
            />
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = await getToken(ctx);
    const session = await getSession(ctx);
    const accessToken = (token?.accessToken as string) ?? '';
    const data = await getSetupIntentToken(accessToken);
    const products = await getProducts(accessToken);

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
