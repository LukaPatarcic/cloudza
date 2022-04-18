import * as React from 'react';

import { NextPage } from 'next';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { resetPassword } from '@api/auth';
import SubmitButton from '@element/SubmitButton/SubmitButton';
import Copyright from '@module/Copyright/Copyright';
import { IResetPassword, IServerError } from '@type/api';
import { IResetPasswordFormInputs } from '@type/validations/auth';

const schema = yup
    .object({
        password: yup
            .string()
            .min(8)
            .matches(
                /^(?=.*[a-z])/,
                'Must contain at least one lowercase character'
            )
            .matches(
                /^(?=.*[A-Z])/,
                'Must contain at least one uppercase character'
            )
            .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
            .required(),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required(),
    })
    .required();

const ForgotPassword: NextPage = () => {
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
        resolver: yupResolver(schema),
    });
    const router = useRouter();

    const onSubmit = (data: IResetPasswordFormInputs) => {
        const { token } = router.query;
        mutation.mutate({
            newPasswordToken: token?.toString(),
            newPassword: data.password,
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
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
                    <SubmitButton isLoading={isLoading}>
                        Reset Password
                    </SubmitButton>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

export default ForgotPassword;
