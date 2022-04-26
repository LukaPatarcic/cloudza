import * as React from 'react';
import { useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { DASHBOARD_ROUTE } from '@constant/routes';
import HeaderLayout from '@layout/HeaderLayout/HeaderLayout';
import LoginPage from '@template/LoginPage/LoginPage';
import { ILoginFormInputs } from '@type/validations/auth';
import { loginSchema } from '@validation/loginSchema';

interface Props {
    csrfToken: string;
}

const Login: NextPage<Props> = ({ csrfToken }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const onSubmit = (data: ILoginFormInputs) => {
        setIsLoading(true);
        signIn<any>('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        })
            .then((res) => {
                if (!res) return;
                if (!res?.ok) {
                    setError('Incorrect email or password');
                    return;
                }
                router.push(
                    router.query?.callbackUrl?.toString() || DASHBOARD_ROUTE
                );
            })
            .catch(() => {
                setError('Something went wrong...');
            })
            .finally(() => {
                setIsLoading(false);
            });
        // e?.target.submit();
    };

    return (
        <HeaderLayout>
            <LoginPage
                errors={errors}
                isLoading={isLoading}
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                csrfToken={csrfToken}
                router={router}
                error={error}
            />
        </HeaderLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    return {
        props: { csrfToken },
    };
};

export default Login;
