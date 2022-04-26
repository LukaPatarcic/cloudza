import * as React from 'react';
import { FC } from 'react';

import Link from 'next/link';

import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { FORGOT_PASSWORD, REGISTER_ROUTE } from '@constant/routes';
import PasswordTextField from '@element/PasswordTextField/PasswordTextField';
import SubmitButton from '@element/SubmitButton/SubmitButton';
import { LoginProps } from '@type/components/LoginProps';

const LoginForm: FC<LoginProps> = ({
    router,
    error,
    handleSubmit,
    onSubmit,
    csrfToken,
    errors,
    register,
    isLoading,
}) => {
    return (
        <Box
            component="form"
            noValidate
            action="/api/auth/callback/credentials"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
        >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                autoFocus
                {...register('email')}
            />
            <PasswordTextField
                margin="normal"
                required
                fullWidth
                label="Password"
                id="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="current-password"
                register={register}
            />
            {(error || router.query?.success) && (
                <Alert severity={error ? 'error' : 'success'}>
                    {error
                        ? error
                        : 'You have successfully verified your account.'}
                </Alert>
            )}
            <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
            <Grid container>
                <Grid item xs>
                    <Link href={FORGOT_PASSWORD}>Forgot password?</Link>
                </Grid>
                <Grid item>
                    <Link href={REGISTER_ROUTE}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;
