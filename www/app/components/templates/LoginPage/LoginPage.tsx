import * as React from 'react';
import { FC } from 'react';

import LoginForm from '@module/Form/LoginForm/LoginForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LoginProps } from '@type/components/LoginProps';

const LoginPage: FC<LoginProps> = ({
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
        <Grid container component="main" sx={{ height: 'calc(100vh - 65px)' }}>
            <Grid
                item
                xs={false}
                sm={false}
                md={7}
                sx={{
                    backgroundImage: 'url(/images/login.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.grey[50],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={12} md={5}>
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
                    <LoginForm
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        register={register}
                        errors={errors}
                        isLoading={isLoading}
                        csrfToken={csrfToken}
                        router={router}
                        error={error}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
