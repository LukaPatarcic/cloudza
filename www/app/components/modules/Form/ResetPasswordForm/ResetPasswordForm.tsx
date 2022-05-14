import * as React from 'react';
import { FC } from 'react';

import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import PasswordTextField from '@element/PasswordTextField/PasswordTextField';
import SubmitButton from '@element/SubmitButton/SubmitButton';
import { ResetPasswordProps } from '@type/components/ResetPasswordProps';

const ResetPasswordForm: FC<ResetPasswordProps> = ({
    currentPassword,
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
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3, width: '100%' }}
        >
            <Grid container spacing={2}>
                {currentPassword && (
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Current Password"
                            type="password"
                            id="currentPassword"
                            helperText={errors.currentPassword?.message}
                            error={!!errors.currentPassword}
                            {...register('currentPassword')}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <PasswordTextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        helperText={errors.password?.message}
                        error={!!errors.password}
                        register={register}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Password Confirm"
                        type="password"
                        id="passwordConfirm"
                        helperText={errors.passwordConfirm?.message}
                        error={!!errors.passwordConfirm}
                        {...register('passwordConfirm')}
                    />
                </Grid>
                {isSuccess && (
                    <Grid item xs={12}>
                        <Alert severity="success">
                            You have successfully reset you password
                        </Alert>
                    </Grid>
                )}
                {isError && (
                    <Grid item xs={12}>
                        <Alert severity="error">{error.message}</Alert>
                    </Grid>
                )}
            </Grid>
            <SubmitButton isLoading={isLoading}>Reset Password</SubmitButton>
        </Box>
    );
};

export default ResetPasswordForm;
