import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { signUp } from '@api/auth';
import DefaultLayout from '@layout/DefaultLayout';
import RegisterPage from '@template/RegisterPage';
import RegisterEmailPage from '@template/RegisterPage/RegisterEmailPage';
import { IRegister, IServerError } from '@type/api';
import { registerSchema } from '@validation/registerSchema';

interface IRegisterFormInputs {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
}

const Register = () => {
    const mutation = useMutation<unknown, IServerError, IRegister>(
        (data) => signUp(data),
        {}
    );
    const { isLoading, error, isSuccess } = mutation;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterFormInputs>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = (data: IRegisterFormInputs) => {
        mutation.mutate(data);
    };

    if (isSuccess) {
        return (
            <DefaultLayout>
                <RegisterEmailPage />
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <RegisterPage
                error={error}
                errors={errors}
                isLoading={isLoading}
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
            />
        </DefaultLayout>
    );
};

export default Register;
