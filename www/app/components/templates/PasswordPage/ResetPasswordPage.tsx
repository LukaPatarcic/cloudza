import * as React from 'react';
import { FC } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Section from '@element/Section/Section';
import ResetPasswordForm from '@module/Form/ResetPasswordForm/ResetPasswordForm';
import { ResetPasswordProps } from '@type/components/ResetPasswordProps';

const ResetPasswordPage: FC<ResetPasswordProps> = ({
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
        <Section>
            <Container maxWidth="sm">
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
                    <ResetPasswordForm
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        isError={isError}
                        error={error}
                        errors={errors}
                        register={register}
                        onSubmit={onSubmit}
                        handleSubmit={handleSubmit}
                    />
                </Box>
            </Container>
        </Section>
    );
};

export default ResetPasswordPage;
