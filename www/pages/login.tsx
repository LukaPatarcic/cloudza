import * as React from 'react';
import { BaseSyntheticEvent, useState } from 'react';

import { GetServerSideProps, NextPage } from 'next';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getCsrfToken } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FORGOT_PASSWORD, REGISTER_ROUTE } from '@constant/routes';
import SubmitButton from '@element/SubmitButton/SubmitButton';
import Copyright from '@module/Copyright/Copyright';
import { ILoginFormInputs } from '@type/validations/auth';

interface Props {
    csrfToken: string;
}

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required();

const Login: NextPage<Props> = ({ csrfToken }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormInputs>({
        resolver: yupResolver(schema),
    });
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const onSubmit = (data: ILoginFormInputs, e?: BaseSyntheticEvent<any>) => {
        setIsLoading(true);
        e?.target.submit();
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        action="/api/auth/callback/credentials"
                        method="POST"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <input
                            name="csrfToken"
                            type="hidden"
                            defaultValue={csrfToken}
                        />
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            autoComplete="current-password"
                            {...register('password')}
                        />
                        {(router.query?.error || router.query?.success) && (
                            <Alert
                                severity={
                                    router.query?.error ? 'error' : 'success'
                                }
                            >
                                {router.query?.error
                                    ? 'Incorrect email or password'
                                    : 'You have successfully verified your account.'}
                            </Alert>
                        )}
                        <SubmitButton isLoading={isLoading}>
                            Sign In
                        </SubmitButton>
                        <Grid container>
                            <Grid item xs>
                                <Link href={FORGOT_PASSWORD}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={REGISTER_ROUTE}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    return {
        props: { csrfToken },
    };
};

export default Login;
