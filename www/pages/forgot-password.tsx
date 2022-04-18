import * as React from 'react';

import { NextPage } from 'next';

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

import { forgotPassword } from '@api/auth';
import SubmitButton from '@element/SubmitButton/SubmitButton';
import Copyright from '@module/Copyright/Copyright';
import { IServerError } from '@type/api';

interface IForgotPasswordFormInputs {
    email: string;
}

const schema = yup
    .object({
        email: yup.string().email().required(),
    })
    .required();

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
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: IForgotPasswordFormInputs) => {
        mutation.mutate(data.email);
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
                    Forgot Password
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
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                helperText={errors.email?.message}
                                error={!!errors.email}
                                {...register('email')}
                            />
                        </Grid>
                        {isSuccess && (
                            <Grid item xs={12}>
                                <Alert severity="success">
                                    We have sent you a confirmation email
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                    <SubmitButton isLoading={isLoading}>
                        Send Email
                    </SubmitButton>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

export default ForgotPassword;
