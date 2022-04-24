import * as React from 'react';
import { BaseSyntheticEvent, useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { getCsrfToken } from 'next-auth/react';
import { useForm } from 'react-hook-form';

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

    const router = useRouter();
    const onSubmit = (
        data: ILoginFormInputs,
        e?: BaseSyntheticEvent<unknown>
    ) => {
        setIsLoading(true);
        e?.target.submit();
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
