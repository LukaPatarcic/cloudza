import * as React from 'react';

import { GetServerSideProps, NextPage } from 'next';

import { yupResolver } from '@hookform/resolvers/yup';
import { getSession, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { resetPassword } from '@api/auth';
import DashboardLayout from '@layout/DashboardLayout';
import ChangePasswordPage from '@template/PasswordPage/ChangePasswordPage';
import { IResetPassword, IServerError } from '@type/api';
import { IChangePasswordFormInputs } from '@type/validations/auth';
import { changePasswordSchema } from '@validation/changePasswordSchema';

const Settings: NextPage = () => {
    const session = useSession();
    const mutation = useMutation<unknown, IServerError, IResetPassword>(
        (data) => resetPassword(data),
        {}
    );
    const { isLoading, isSuccess, isError, error } = mutation;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IChangePasswordFormInputs>({
        resolver: yupResolver(changePasswordSchema),
    });

    const onSubmit = (data: IChangePasswordFormInputs) => {
        mutation.mutate({
            email: session.data!.user!.email!,
            newPassword: data.password,
            currentPassword: data.currentPassword,
            passwordConfirm: data.passwordConfirm,
        });
    };

    return (
        <DashboardLayout selectedItem="Settings">
            <ChangePasswordPage
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                error={error}
                errors={errors}
                register={register}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
            />
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    return {
        props: {
            session,
        },
    };
};

export default Settings;
