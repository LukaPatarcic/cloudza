import * as React from 'react';
import { FC } from 'react';

import Link from 'next/link';

import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { LOGIN_ROUTE } from '@constant/routes';
import SubmitButton from '@element/SubmitButton/SubmitButton';
import { RegisterProps } from '@type/components/RegisterProps';

const RegisterForm: FC<RegisterProps> = ({
    handleSubmit,
    onSubmit,
    errors,
    register,
    error,
    isLoading,
}) => {
    return (
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        helperText={errors.name?.message}
                        error={!!errors.name}
                        {...register('name')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        helperText={errors.email?.message}
                        error={!!errors.email}
                        {...register('email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        helperText={errors.password?.message}
                        error={!!errors.password}
                        {...register('password')}
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
                {error && (
                    <Grid item xs={12}>
                        <Alert severity="error">{error?.message}</Alert>
                    </Grid>
                )}
            </Grid>
            <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href={LOGIN_ROUTE}>
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RegisterForm;
