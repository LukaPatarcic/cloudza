import * as React from 'react';
import { FC } from 'react';

import Paper from '@element/Paper';
import ResetPasswordForm from '@module/Form/ResetPasswordForm/ResetPasswordForm';
import { ResetPasswordProps } from '@type/components/ResetPasswordProps';

const ChangePasswordPage: FC<ResetPasswordProps> = ({
    isLoading,
    isSuccess,
    isError,
    error,
    errors,
    register,
    onSubmit,
    handleSubmit,
}) => {
    return (
        <Paper>
            <ResetPasswordForm
                currentPassword
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                error={error}
                errors={errors}
                register={register}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
            />
        </Paper>
    );
};

export default ChangePasswordPage;
