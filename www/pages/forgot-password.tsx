import * as React from 'react';

import { NextPage } from 'next';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { forgotPassword } from '@api/auth';
import DefaultLayout from '@layout/DefaultLayout';
import ForgotPasswordPage from '@template/ForgotPasswordPage';
import { IServerError } from '@type/api';
import { forgotPasswordSchema } from '@validation/forgotPasswordSchema';

interface IForgotPasswordFormInputs {
    email: string;
}

const ForgotPassword: NextPage = () => {
    const mutation = useMutation<unknown, IServerError, string>(
        (data) => forgotPassword(data),
        {}
    );
    const { isLoading, isSuccess } = mutation;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForgotPasswordFormInputs>({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: IForgotPasswordFormInputs) => {
        mutation.mutate(data.email);
    };

    return (
        <DefaultLayout>
            <ForgotPasswordPage
                isLoading={isLoading}
                isSuccess={isSuccess}
                errors={errors}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            />
        </DefaultLayout>
    );
};

export default ForgotPassword;
