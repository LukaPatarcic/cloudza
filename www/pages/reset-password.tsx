import * as React from 'react';

import { NextPage } from 'next';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { resetPassword } from '@api/auth';
import DefaultLayout from '@layout/DefaultLayout';
import ResetPasswordPage from '@template/PasswordPage/ResetPasswordPage';
import { IResetPassword, IServerError } from '@type/api';
import { IResetPasswordFormInputs } from '@type/validations/auth';
import { resetPasswordSchema } from '@validation/resetPasswordSchema';

const ResetPassword: NextPage = () => {
    const mutation = useMutation<unknown, IServerError, IResetPassword>(
        (data) => resetPassword(data),
        {}
    );
    const { isLoading, isSuccess, isError, error } = mutation;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IResetPasswordFormInputs>({
        resolver: yupResolver(resetPasswordSchema),
    });
    const router = useRouter();

    const onSubmit = (data: IResetPasswordFormInputs) => {
        const { token } = router.query;
        mutation.mutate({
            newPasswordToken: token?.toString(),
            newPassword: data.password,
            passwordConfirm: data.passwordConfirm,
        });
    };

    return (
        <DefaultLayout>
            <ResetPasswordPage
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                error={error}
                errors={errors}
                register={register}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
            />
        </DefaultLayout>
    );
};

export default ResetPassword;
