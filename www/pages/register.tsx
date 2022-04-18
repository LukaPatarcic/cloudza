import * as React from 'react';

import Link from 'next/link';

import { yupResolver } from '@hookform/resolvers/yup';
import { EmailRounded } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { signUp } from '@api/auth';
import { LOGIN_ROUTE } from '@constant/routes';
import SubmitButton from '@element/SubmitButton/SubmitButton';
import Copyright from '@module/Copyright/Copyright';
import { IRegister, IServerError } from '@type/api';

interface IRegisterFormInputs {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
}

const schema = yup
    .object({
        email: yup.string().email().required(),
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
        name: yup.string().min(2).max(40).required(),
    })
    .required();

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
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: IRegisterFormInputs) => {
        mutation.mutate(data);
    };

    if (isSuccess) {
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
                        <EmailRounded />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                        sx={{ marginBottom: 2 }}
                    >
                        Please confirm your email address
                    </Typography>
                    <Typography component="p" align="center">
                        We have sent you a confirmation email. In order to log
                        in you will have to confirm your email first.
                    </Typography>
                </Box>
            </Container>
        );
    }
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
                    Sign up
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
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

export default Register;
